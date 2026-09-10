const axios = require('axios');
const env = require('../config/env');
const { query } = require('../config/db');

// Cache portfolio data in memory to avoid repeated DB hits on high traffic
let cachedContext = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch and construct complete portfolio context from MySQL database.
 * Automatically keeps AI updated whenever admin changes database entries.
 */
const getPortfolioContext = async () => {
  const now = Date.now();
  if (cachedContext && now - lastCacheTime < CACHE_TTL_MS) {
    return cachedContext;
  }

  try {
    const [profileRows, skillRows, expRows, eduRows, projRows] = await Promise.all([
      query('SELECT * FROM profile LIMIT 1').catch(() => []),
      query('SELECT name, category, proficiency FROM skills ORDER BY category, display_order').catch(() => []),
      query('SELECT job_title, company, employment_type, start_date, end_date, description FROM experiences ORDER BY display_order').catch(() => []),
      query('SELECT degree, institution, start_year, end_year, description, relevant_information FROM education ORDER BY display_order').catch(() => []),
      query('SELECT title, short_description, detailed_description, github_url, live_url FROM projects ORDER BY display_order').catch(() => []),
    ]);

    const profile = profileRows?.[0] || {
      name: 'Muhammad Hassan Iqbal',
      professional_title: 'Full Stack Software Engineer',
      status: 'Available for projects & full-time roles',
      short_bio: 'Detail-oriented Full Stack Developer building scalable, secure web applications using Node.js, React.js, Next.js, and modern MySQL architectures.',
      full_bio: 'Dedicated Full Stack Software Engineer specializing in constructing interactive, high-performance web applications and scalable software systems with React, Next.js, Node.js, Express, and MySQL.',
      journey: 'With hands-on experience building scalable applications at 7KingsCode and Icommunix, focusing on clean system design, component reusability, and secure RESTful APIs.',
      interests: 'Distributed systems, full-stack architectures, API performance tuning, secure authentication protocols, open-source tech, UI/UX aesthetics, and scalable cloud solutions.',
      philosophy: 'Believes in writing clean, maintainable, and self-documenting code paired with thoughtful design aesthetics. Every line of code should prioritize speed, accessibility, and robust reliability.',
      email: 'mhassaniqbal18@gmail.com',
      phone: '+92 3222765632',
      location: 'Lahore, Pakistan',
      github_url: 'https://github.com',
      linkedin_url: 'https://linkedin.com',
    };

    const skillsText = (skillRows || [])
      .map((s) => `${s.name} (${s.category}, ${s.proficiency}% proficiency)`)
      .join(', ');

    const expText = (expRows || [])
      .map(
        (e) =>
          `• ${e.job_title} at ${e.company} (${e.start_date} - ${e.end_date || 'Present'}, ${e.employment_type}): ${e.description}`
      )
      .join('\n');

    const eduText = (eduRows || [])
      .map(
        (ed) =>
          `• ${ed.degree} from ${ed.institution} (${ed.start_year} - ${ed.end_year || 'Present'}): ${ed.description}${ed.relevant_information ? ` | Relevant: ${ed.relevant_information}` : ''}`
      )
      .join('\n');

    const projText = (projRows || [])
      .map(
        (p, i) =>
          `${i + 1}. ${p.title}: ${p.short_description || ''} ${p.detailed_description ? `(${p.detailed_description.slice(0, 160)}...)` : ''} ${p.github_url ? `[Repo: ${p.github_url}]` : ''} ${p.live_url ? `[Live: ${p.live_url}]` : ''}`
      )
      .join('\n');

    const context = {
      profile,
      skills: skillRows || [],
      experiences: expRows || [],
      education: eduRows || [],
      projects: projRows || [],
      formattedPromptContext: `
=== PROFILE OF MUHAMMAD HASSAN IQBAL ===
- Full Name: ${profile.name}
- Professional Title: ${profile.professional_title}
- Availability / Status: ${profile.status}
- Location: ${profile.location || 'Lahore, Pakistan (Open to Remote & Relocation)'}
- Contact Email: ${profile.email}
- Contact Phone: ${profile.phone || '+92 3222765632'}
- LinkedIn: ${profile.linkedin_url || 'https://linkedin.com'}
- GitHub: ${profile.github_url || 'https://github.com'}

=== BIOGRAPHY & JOURNEY ===
- Short Bio: ${profile.short_bio}
- Detailed Bio: ${profile.full_bio}
- Career Journey: ${profile.journey || 'Extensive hands-on experience in full-stack web platforms and backend engineering.'}

=== INTERESTS, HOBBIES & OTHER INFO ===
- Personal & Tech Interests: ${profile.interests || 'Distributed systems, full-stack architecture, UI micro-interactions, exploring cutting-edge developer tools.'}
- Engineering Philosophy: ${profile.philosophy || 'Clean code, modular architecture, performance optimization, and intuitive user experiences.'}

=== TECHNICAL SKILLS & STACK ===
${skillsText || 'Next.js, React.js, Node.js, Express.js, MySQL, JavaScript (ES6+), TypeScript, Tailwind CSS, REST APIs, Git, Docker, JWT Auth'}

=== PROFESSIONAL WORK EXPERIENCE ===
${expText || '• FrontEnd Developer at 7KingsCode\n• Backend Development Intern at Icommunix'}

=== ACADEMIC EDUCATION ===
${eduText || '• BS in Information Technology from University of Education, Lahore'}

=== FEATURED PROJECTS ===
${projText || '1. CWS Headless CMS Platform\n2. Secure Login & User CRUD System\n3. Apex Cloud Commerce'}
`.trim(),
    };

    cachedContext = context;
    lastCacheTime = now;
    return context;
  } catch (err) {
    console.warn('[AI SERVICE] Could not load dynamic portfolio data from DB, using defaults:', err.message);
    return null;
  }
};

/**
 * Generate AI reply using Gemini LLM if key exists, with full portfolio context.
 * Falls back to intelligent context-aware keyword engine if offline/no key.
 */
const generateAssistantReply = async (userMessage, convId = null) => {
  const msg = (userMessage || '').trim();
  const lower = msg.toLowerCase();
  const portfolioData = await getPortfolioContext();
  const dynamicContext = portfolioData?.formattedPromptContext || '';
  const profile = portfolioData?.profile || {};

  const apiKey = env.AI_API_KEY || env.GEMINI_API_KEY;

  // 1. If Gemini API Key is available, invoke Google Gemini LLM
  if (apiKey) {
    try {
      // Retrieve recent conversation history for contextual multi-turn dialogue
      let conversationHistory = [];
      if (convId) {
        try {
          const pastMessages = await query(
            'SELECT sender, message FROM chat_messages WHERE conversation_id = ? ORDER BY id DESC LIMIT 6',
            [convId]
          );
          if (pastMessages && pastMessages.length > 0) {
            conversationHistory = pastMessages.reverse().map((m) => ({
              role: m.sender === 'user' ? 'user' : 'model',
              parts: [{ text: m.message }],
            }));
          }
        } catch {
          // ignore history lookup failure
        }
      }

      const systemInstructionText = `
You are the personal, intelligent, and articulate AI Assistant for Muhammad Hassan Iqbal on his portfolio website.
Your objective is to represent Hassan with extreme accuracy, professionalism, warmth, and dynamic responsiveness.

Here is Hassan's complete portfolio and background context:
${dynamicContext}

GUIDELINES FOR YOUR RESPONSES:
1. When asked about ANY information regarding Hassan (his background, bio, hobbies, interests, philosophy, journey, tech stack, experience, projects, education, location, or contact info), answer thoroughly and dynamically using the context above.
2. If asked technical or programming questions (e.g. React hooks, Express architecture, MySQL indexing), answer authoritatively as a skilled Full Stack Engineer aligned with Hassan's philosophy.
3. Keep answers concise, clear, and engaging (usually 2-4 sentences or structured bullet points). Avoid fluff.
4. Speak in a helpful assistant tone (e.g. "Hassan is...", "His core expertise...", "You can contact him at...").
5. If the visitor asks something completely irrelevant or inappropriate, politely bring the conversation back to Hassan's portfolio or offering assistance with his work.
`.trim();

      const contents = [
        ...conversationHistory,
        {
          role: 'user',
          parts: [
            {
              text: `${systemInstructionText}\n\nUser Question: ${msg}`,
            },
          ],
        },
      ];

      const modelName = env.AI_MODEL || 'gemini-3.6-flash';
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        },
        { timeout: 6000 }
      );

      const parts = response.data?.candidates?.[0]?.content?.parts || [];
      const text = parts.map((p) => p.text).filter(Boolean).join('\n').trim();
      if (text) return text;
    } catch (err) {
      console.warn('[AI SERVICE] Gemini API call failed or timed out, falling back to intelligent knowledge engine:', err.message);
    }
  }

  // 2. Dynamic Rule-Based / Context Engine (Fallback)
  // Check Specific Project: CWS Headless CMS
  if (/\b(cws|headless|sitecore)\b/i.test(lower)) {
    const cwsProj = portfolioData?.projects?.find((p) => (p.title || '').toLowerCase().includes('cws') || (p.slug || '').includes('cws'));
    if (cwsProj) {
      return `**${cwsProj.title}**: ${cwsProj.short_description || 'Scalable enterprise headless CMS web application built with Next.js, Sitecore, GraphQL, and TypeScript.'} It features decoupled architectures, high-performance content delivery, sub-second routing, and modular components. You can check out its complete details in the Projects section!`;
    }
    return `**CWS Headless CMS Platform** is an enterprise-grade headless CMS web application engineered by Hassan using Next.js, Sitecore, GraphQL, and TypeScript. It features dynamic content rendering, decoupled architectures, and modular component reusability. You can check out its complete showcase in the Projects section!`;
  }

  // Check Specific Project: Secure Login & User CRUD System
  if (/\b(crud|login|user management|auth system)\b/i.test(lower)) {
    const crudProj = portfolioData?.projects?.find((p) => (p.title || '').toLowerCase().includes('crud') || (p.slug || '').includes('crud'));
    if (crudProj) {
      return `**${crudProj.title}**: ${crudProj.short_description || 'Robust backend application featuring comprehensive CRUD user management, strict Joi input validation, and password encryption.'} It includes Crypto.js password hashing, parameter-safe MySQL queries, and clean architecture.`;
    }
    return `The **Secure Login & User CRUD System** is a production-grade full-stack application built with Node.js, Express, and MySQL. It incorporates Crypto.js password hashing, strict Joi schema validation, robust JWT session management, and optimized database queries with parameterized SQL.`;
  }

  // Check Specific Project: Apex Cloud Commerce
  if (/\b(apex|commerce|ecommerce|store|shop)\b/i.test(lower)) {
    return `**Apex Cloud Commerce** is an enterprise e-commerce platform built by Hassan featuring real-time inventory synchronization, relational MySQL transactional locking for checkout consistency, and an ultra-responsive Next.js frontend.`;
  }

  // Check Interests / Hobbies / Other Info
  if (/\b(interest|interests|hobby|hobbies|free time|passion|passions|activity|activities|other info|more info)\b/i.test(lower)) {
    const interests = profile.interests || 'distributed systems, full-stack architectures, API performance tuning, open-source technologies, and UI/UX micro-interactions';
    return `In his free time and beyond day-to-day coding, Hassan is passionate about: ${interests}. He constantly explores modern web frameworks, systems architecture, and sleek design trends!`;
  }

  // Check Philosophy / Approach / Principles
  if (/\b(philosophy|principle|principles|approach|mindset|values|coding style|clean code)\b/i.test(lower)) {
    const philosophy = profile.philosophy || 'writing clean, maintainable, and self-documenting code with thoughtful design aesthetics, prioritizing speed, accessibility, and reliability';
    return `Hassan's engineering philosophy is centered around: "${philosophy}". He adheres strictly to SOLID principles, clean modular architecture, and sub-second web performance.`;
  }

  // Check Journey / Story / Background
  if (/\b(journey|story|background|path|how did he start|history)\b/i.test(lower)) {
    const journey = profile.journey || 'hands-on experience building scalable applications at 7KingsCode and Icommunix, focusing on component reusability and secure APIs';
    return `Hassan's journey as a developer: ${journey}. He graduated with a BS in Information Technology and has developed enterprise web solutions and high-concurrency systems.`;
  }

  // Check Location / Relocation / Remote
  if (/\b(location|city|country|where is he|based|remote|relocate|relocation|pakistan|lahore)\b/i.test(lower)) {
    const loc = profile.location || 'Lahore, Pakistan';
    return `Hassan is based in ${loc}. He is available for remote opportunities worldwide, as well as on-site roles or relocation for the right software engineering opportunity!`;
  }

  // Check About / Who is Hassan / Profile
  if (/\b(who|about|hassan|muhammad|introduce|profile|summary)\b/i.test(lower)) {
    const bio = profile.full_bio || profile.short_bio;
    return `Muhammad Hassan Iqbal is a ${profile.professional_title || 'Full Stack Software Engineer'}. ${bio} His core stack covers Next.js, React.js, Node.js, Express.js, and MySQL.`;
  }

  // Check Skills / Stack / Tech
  if (/\b(skill|skills|stack|technologies|tech|react|next|node|express|mysql|javascript|typescript|database)\b/i.test(lower)) {
    const skillList = portfolioData?.skills?.length
      ? portfolioData.skills.map((s) => s.name).slice(0, 12).join(', ')
      : 'React.js, Next.js (App Router), Node.js, Express.js, MySQL, JavaScript (ES6+), Tailwind CSS, REST APIs, Git, Docker, JWT Auth';
    return `Hassan's core technical toolkit includes:\n• Frontend: Next.js (App Router), React.js, JavaScript (ES6+), Glassmorphic UI/UX\n• Backend: Node.js, Express.js, REST APIs, JWT Auth, Microservices\n• Database: MySQL relational schemas, indexing, query optimization\n• Top skills: ${skillList}`;
  }

  // Check Projects / Portfolio / Work Showcase
  if (/\b(project|projects|portfolio|work|built|showcase|app|apps|ecommerce|cms|crud)\b/i.test(lower)) {
    if (portfolioData?.projects?.length) {
      const topProjects = portfolioData.projects
        .slice(0, 3)
        .map((p, i) => `${i + 1}. **${p.title}**: ${p.short_description || 'Production web application'}`)
        .join('\n');
      return `Here are some of Hassan's featured projects:\n${topProjects}\n\nYou can explore all project details, live demos, and GitHub repositories in the Projects section!`;
    }
    return `Featured projects built by Hassan:\n1. **CWS Headless CMS Platform**: High-performance headless content system built with Next.js, TypeScript, and GraphQL.\n2. **Secure Login & User CRUD System**: Production-ready auth platform built with Node.js, Express, and MySQL.\n3. **Apex Cloud Commerce**: Scalable e-commerce engine with real-time stock sync.`;
  }

  // Check Experience / Jobs / Companies
  if (/\b(experience|work experience|career|job|jobs|company|companies|7kingscode|icommunix|role|roles)\b/i.test(lower)) {
    return `Hassan's engineering experience includes:\n• **FrontEnd Developer at 7KingsCode**: Engineered modular and scalable UI components with React.js, optimized client-side state, and streamlined API communication.\n• **Backend Development Intern at Icommunix**: Built secure RESTful APIs using Node.js & MySQL, and integrated AWS Lambda serverless modules.`;
  }

  // Check Education / Degree / College
  if (/\b(education|degree|university|college|certification|study|graduate|gpa|bsit)\b/i.test(lower)) {
    return `Hassan holds a **BS in Information Technology** from the **University of Education, Lahore**. His curriculum emphasized Software Engineering, OOP, Relational Database Management Systems, Computer Networks, and Cloud Computing.`;
  }

  // Check Hire / Contact / Email / Phone / Rate
  if (/\b(hire|contact|email|phone|call|message|reach|available|freelance|rate|salary|contract)\b/i.test(lower)) {
    return `Hassan is currently **${profile.status || 'available for full-time software engineering roles and high-impact freelance projects'}**!\n• Email: ${profile.email || 'mhassaniqbal18@gmail.com'}\n• Phone: ${profile.phone || '+92 3222765632'}\n• Or send a direct message through the Contact section right on this website!`;
  }

  // Check Services / What can he build
  if (/\b(service|services|build|what can you do|what can he do|offer|capabilities)\b/i.test(lower)) {
    return `Hassan builds end-to-end modern digital products:\n1. High-speed web applications with Next.js & React\n2. Secure REST APIs & backend microservices with Node.js & Express\n3. Scalable MySQL database architectures & performance tuning\n4. Responsive, glassmorphic UI/UX interfaces with dark/light themes`;
  }

  // Greetings
  if (/\b(hi|hello|hey|greetings|morning|afternoon|evening|salam|assalam)\b/i.test(lower)) {
    return `Hello! I'm the AI assistant for Muhammad Hassan Iqbal. I can answer anything about Hassan's full-stack skills, projects, experience, personal interests, philosophy, or how to work with him. What would you like to know?`;
  }

  // Thanks / Appreciation
  if (/\b(thank|thanks|great|awesome|cool|perfect|good)\b/i.test(lower)) {
    return `You're very welcome! Let me know if you have any more questions about Hassan or want to get in touch with him!`;
  }

  // Default intelligent fallback
  return `Thanks for asking! Muhammad Hassan Iqbal is a ${profile.professional_title || 'Full Stack Developer'} specializing in Next.js, React, Node.js, Express, and MySQL. You can ask me about his tech stack, featured projects, work experience, education, personal interests, engineering philosophy, or use the Contact form to connect with him directly!`;
};

/**
 * Handle incoming chat message, log conversation to database, and return generated reply.
 */
const processChatMessage = async (userMessage, sessionId = 'default_session') => {
  let convId = null;

  // Retrieve or create conversation session
  try {
    const convRows = await query('SELECT id FROM chat_conversations WHERE session_id = ? LIMIT 1', [sessionId]);
    if (!convRows || convRows.length === 0) {
      const convResult = await query('INSERT INTO chat_conversations (session_id) VALUES (?)', [sessionId]);
      convId = convResult.insertId;
    } else {
      convId = convRows[0].id;
    }
  } catch (err) {
    console.warn('[AI SERVICE] Database conversation session lookup warning:', err.message);
  }

  // Generate dynamic context-aware reply
  const reply = await generateAssistantReply(userMessage, convId);

  // Non-blocking log to database
  if (convId) {
    try {
      await query('INSERT INTO chat_messages (conversation_id, sender, message) VALUES (?, ?, ?)', [convId, 'user', userMessage]);
      await query('INSERT INTO chat_messages (conversation_id, sender, message) VALUES (?, ?, ?)', [convId, 'assistant', reply]);
    } catch (err) {
      console.warn('[AI SERVICE] Could not log chat messages to DB:', err.message);
    }
  }

  return {
    reply,
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  processChatMessage,
  generateAssistantReply,
  getPortfolioContext,
};
