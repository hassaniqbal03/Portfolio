const axios = require('axios');
const env = require('../config/env');
const { query } = require('../config/db');

// Domain Knowledge Context for Hassan's Portfolio
const KNOWLEDGE_BASE = [
  {
    topics: ['who', 'about', 'hassan', 'muhammad', 'introduce', 'background', 'developer', 'profile'],
    reply: "Muhammad Hassan Iqbal is a dedicated Full Stack Developer specializing in modern web platforms. His expertise covers React, Next.js (App Router), Node.js, Express.js, and relational database systems with MySQL. He builds high-concurrency, responsive web applications with clean architecture and delightful UI/UX."
  },
  {
    topics: ['skill', 'skills', 'stack', 'technologies', 'tech', 'react', 'next', 'node', 'express', 'mysql', 'javascript'],
    reply: "Hassan's core technical stack includes:\n• Frontend: Next.js (App Router), React.js, JavaScript (ES6+), HTML5/CSS3, Glassmorphism & Responsive Design\n• Backend: Node.js, Express.js, RESTful APIs, JWT Auth, Microservices\n• Database: MySQL schema design, query optimization, ACID transactions\n• DevOps: Git, Docker, Linux/Nginx, Axios, CI/CD"
  },
  {
    topics: ['project', 'projects', 'portfolio', 'work', 'ecommerce', 'commerce', 'omniflow', 'nexus', 'github'],
    reply: "Key featured projects built by Hassan:\n1. Apex Cloud Commerce: High-performance enterprise e-commerce platform with real-time stock sync and MySQL transactional locking.\n2. OmniFlow Task Suite: Interactive workspace with drag-and-drop Kanban, sprint metrics, and team collaboration.\n3. Nexus Insights Financial Analytics: High-throughput telemetry & analytics engine with sub-15ms query execution."
  },
  {
    topics: ['experience', 'work experience', 'career', 'job', 'company', '7kingscode', 'icommunix'],
    reply: "Hassan's engineering experience includes:\n• FrontEnd Developer at 7KingsCode: Building scalable and reusable UI components with React.js, optimizing component rendering, and managing API integrations.\n• Backend Development Intern at Icommunix: Engineered secure RESTful APIs using Node.js and MySQL, and deployed serverless modules with AWS Lambda."
  },
  {
    topics: ['education', 'degree', 'university', 'college', 'certification', 'study', 'graduate'],
    reply: "Hassan holds a BS in Information Technology from the University of Education, Lahore, with core coursework in Software Engineering, OOP, Databases, Networking, Cloud Computing, and Advanced Programming."
  },
  {
    topics: ['hire', 'contact', 'email', 'phone', 'available', 'freelance', 'contract', 'reach', 'message'],
    reply: "Hassan is currently available for software engineering roles and freelance projects! You can reach him directly at mhassaniqbal18@gmail.com, call +92 3222765632, or submit a message using the Contact section on this website."
  },
  {
    topics: ['architecture', 'rest', 'api', 'clean code', 'solid', 'design'],
    reply: "Hassan strictly adheres to SOLID principles, clean modular architecture, separation of concerns between Next.js frontends and Express backends, and robust database indexing for optimal speed and maintainability."
  }
];

const generateAssistantReply = async (userMessage) => {
  const msg = (userMessage || '').trim();
  const lower = msg.toLowerCase();

  // 1. Try Gemini API if key is provided
  if (env.GEMINI_API_KEY) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `You are an AI assistant representing Muhammad Hassan Iqbal on his portfolio website.
Answer questions politely, professionally, and concisely based on his profile:
- Name: Muhammad Hassan Iqbal
- Role: Full Stack Developer (React, Next.js, Node.js, Express, MySQL)
- Experience: 3+ years in scalable web platforms, REST APIs, and database engineering.
- Contact: mhassaniqbal18@gmail.com
User query: ${msg}`
                }
              ]
            }
          ]
        },
        { timeout: 8000 }
      );
      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text.trim();
    } catch (err) {
      console.warn('[AI SERVICE] Gemini API call failed, using intelligent portfolio knowledge engine:', err.message);
    }
  }

  // 2. Intelligent Knowledge Base Engine
  let bestMatch = null;
  let maxScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of item.topics) {
      if (lower.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = item.reply;
    }
  }

  if (bestMatch && maxScore > 0) {
    return bestMatch;
  }

  // Greeting check
  if (/\b(hi|hello|hey|greetings|morning|afternoon)\b/i.test(lower)) {
    return "Hello! I'm the AI assistant for Muhammad Hassan Iqbal. I can answer questions about Hassan's full-stack skills, portfolio projects, professional experience, education, or help you connect with him. What would you like to know?";
  }

  // Default helpful overview
  return "Thanks for asking! Muhammad Hassan Iqbal is a Full Stack Developer specializing in React, Next.js, Node.js, Express, and MySQL. You can ask me about his tech stack, featured projects (like CWS Headless CMS Platform and Secure Login CRUD System), work experience at 7KingsCode, or use the Contact form to reach him directly.";
};

const processChatMessage = async (userMessage, sessionId = 'default_session') => {
  const reply = await generateAssistantReply(userMessage);

  // Non-blocking log to database
  try {
    let convRows = await query('SELECT id FROM chat_conversations WHERE session_id = ? LIMIT 1', [sessionId]);
    let convId;
    if (!convRows || convRows.length === 0) {
      const convResult = await query('INSERT INTO chat_conversations (session_id) VALUES (?)', [sessionId]);
      convId = convResult.insertId;
    } else {
      convId = convRows[0].id;
    }

    await query('INSERT INTO chat_messages (conversation_id, sender, message) VALUES (?, ?, ?)', [convId, 'user', userMessage]);
    await query('INSERT INTO chat_messages (conversation_id, sender, message) VALUES (?, ?, ?)', [convId, 'assistant', reply]);
  } catch (err) {
    // Database logging error is non-fatal for chat
    console.warn('[AI SERVICE] Could not log chat to DB:', err.message);
  }

  return {
    reply,
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  processChatMessage,
  generateAssistantReply,
};
