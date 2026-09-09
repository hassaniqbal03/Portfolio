const { query } = require('../config/db');

const DEFAULT_PROFILE = {
  id: 1,
  name: "Muhammad Hassan Iqbal",
  title: "Full Stack Software Engineer",
  status: "Available for projects & full-time roles",
  shortBio: "Detail-oriented Full Stack Developer building scalable, secure web applications using Node.js, React.js, Next.js, and modern MySQL architectures.",
  fullBio: "I am a dedicated Full Stack Software Engineer specializing in constructing interactive, high-performance web applications and scalable software systems. My core expertise centers around React, Next.js, Node.js, Express, and modern relational databases like MySQL. Adept at designing RESTful APIs, implementing robust authentication systems, and developing responsive user interfaces.",
  journey: "With hands-on experience building scalable applications at 7KingsCode and Icommunix, I focus on clean system design, component reusability, and secure RESTful APIs.",
  interests: "Distributed systems, full-stack architectures, API performance tuning, secure authentication protocols, and scalable cloud solutions.",
  philosophy: "I believe in writing clean, maintainable, and self-documenting code paired with thoughtful design aesthetics. Every line of code should prioritize speed, accessibility, and robust reliability.",
  avatar: "/profile.jpg",
  location: "Lahore, Pakistan",
  email: "mhassaniqbal18@gmail.com",
  phone: "+92 3222765632",
  resumeUrl: "/M_HASSAN_IQBAL_ATS_CV.pdf",
  socialLinks: {
    github: "https://github.com/hassaniqbalo3",
    linkedin: "https://linkedin.com/in/muhammad-hassan-iqbal",
    email: "mailto:mhassaniqbal18@gmail.com"
  }
};

const DEFAULT_STATS = [
  { label: 'Projects Delivered', value: '24+' },
  { label: 'Years Experience', value: '3+' },
  { label: 'Modern Technologies', value: '18+' },
  { label: 'Client Satisfaction', value: '100%' },
];

const DEFAULT_ABOUT_FEATURES = [
  {
    id: 1,
    title: 'Clean Architecture',
    description: 'Writing maintainable, decoupled code following modern design patterns, SOLID principles, and clean state management.',
    icon: 'Code',
  },
  {
    id: 2,
    title: 'Modular UI Systems',
    description: 'Designing responsive, accessible, and scalable component libraries with CSS design tokens and micro-interactions.',
    icon: 'Layers',
  },
  {
    id: 3,
    title: 'High-Performance APIs',
    description: 'Architecting secure, optimized REST APIs with Express.js, structured error handling, and robust database indexing.',
    icon: 'Zap',
  },
  {
    id: 4,
    title: 'Modern Full Stack UX',
    description: 'Fusing cutting-edge frontend interfaces with resilient backend services to craft fluid, delightful user experiences.',
    icon: 'Palette',
  },
];

let memoryProfile = { ...DEFAULT_PROFILE };

const getProfile = async () => {
  try {
    const rows = await query('SELECT * FROM profile ORDER BY id ASC LIMIT 1');
    if (rows && rows.length > 0) {
      const p = rows[0];
      const projectCountRows = await query('SELECT COUNT(*) as count FROM projects').catch(() => [{ count: 24 }]);
      const skillCountRows = await query('SELECT COUNT(*) as count FROM skills').catch(() => [{ count: 18 }]);

      const stats = [
        { label: 'Projects Delivered', value: `${projectCountRows[0]?.count || 24}+` },
        { label: 'Years Experience', value: '3+' },
        { label: 'Modern Technologies', value: `${skillCountRows[0]?.count || 18}+` },
        { label: 'Client Satisfaction', value: '100%' },
      ];

      return {
        profile: {
          id: p.id,
          name: p.name,
          title: p.professional_title,
          status: p.status,
          shortBio: p.short_bio,
          fullBio: p.full_bio,
          journey: p.journey,
          interests: p.interests,
          philosophy: p.philosophy,
          avatar: p.profile_image,
          email: p.email,
          phone: p.phone,
          location: p.location,
          resumeUrl: p.cv_url,
          socialLinks: {
            github: p.github_url,
            linkedin: p.linkedin_url,
            email: `mailto:${p.email}`,
          },
        },
        stats,
        aboutFeatures: DEFAULT_ABOUT_FEATURES,
      };
    }
    return {
      profile: memoryProfile,
      stats: DEFAULT_STATS,
      aboutFeatures: DEFAULT_ABOUT_FEATURES,
    };
  } catch (error) {
    console.warn('[PROFILE SERVICE] In-memory profile fallback:', error.message);
    return {
      profile: memoryProfile,
      stats: DEFAULT_STATS,
      aboutFeatures: DEFAULT_ABOUT_FEATURES,
    };
  }
};

const updateProfile = async (data) => {
  try {
    const existing = await query('SELECT id FROM profile ORDER BY id ASC LIMIT 1');

    if (existing.length === 0) {
      await query(
        `INSERT INTO profile (name, professional_title, status, short_bio, full_bio, journey, interests, philosophy, profile_image, email, phone, location, github_url, linkedin_url, cv_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.name || 'Muhammad Hassan Iqbal',
          data.title || data.professional_title || 'Full Stack Software Engineer',
          data.status || 'Available for projects & full-time roles',
          data.shortBio || data.short_bio || '',
          data.fullBio || data.full_bio || '',
          data.journey || '',
          data.interests || '',
          data.philosophy || '',
          data.avatar || data.profile_image || '/profile.jpg',
          data.email || 'mhassaniqbal18@gmail.com',
          data.phone || '+92 3222765632',
          data.location || 'Lahore, Pakistan',
          data.github_url || 'https://github.com/hassaniqbalo3',
          data.linkedin_url || 'https://linkedin.com/in/muhammad-hassan-iqbal',
          data.resumeUrl || data.cv_url || '/M_HASSAN_IQBAL_ATS_CV.pdf',
        ]
      );
    } else {
      const id = existing[0].id;
      await query(
        `UPDATE profile SET
          name = COALESCE(?, name),
          professional_title = COALESCE(?, professional_title),
          status = COALESCE(?, status),
          short_bio = COALESCE(?, short_bio),
          full_bio = COALESCE(?, full_bio),
          journey = COALESCE(?, journey),
          interests = COALESCE(?, interests),
          philosophy = COALESCE(?, philosophy),
          profile_image = COALESCE(?, profile_image),
          email = COALESCE(?, email),
          phone = COALESCE(?, phone),
          location = COALESCE(?, location),
          github_url = COALESCE(?, github_url),
          linkedin_url = COALESCE(?, linkedin_url),
          cv_url = COALESCE(?, cv_url)
         WHERE id = ?`,
        [
          data.name,
          data.title || data.professional_title,
          data.status,
          data.shortBio || data.short_bio,
          data.fullBio || data.full_bio,
          data.journey,
          data.interests,
          data.philosophy,
          data.avatar || data.profile_image,
          data.email,
          data.phone,
          data.location,
          data.github_url,
          data.linkedin_url,
          data.resumeUrl || data.cv_url,
          id,
        ]
      );
    }
  } catch (error) {
    console.warn('[PROFILE SERVICE] Update profile fallback:', error.message);
  }

  memoryProfile = {
    ...memoryProfile,
    name: data.name || memoryProfile.name,
    title: data.title || data.professional_title || memoryProfile.title,
    status: data.status || memoryProfile.status,
    shortBio: data.shortBio || data.short_bio || memoryProfile.shortBio,
    fullBio: data.fullBio || data.full_bio || memoryProfile.fullBio,
    journey: data.journey || memoryProfile.journey,
    interests: data.interests || memoryProfile.interests,
    philosophy: data.philosophy || memoryProfile.philosophy,
    avatar: data.avatar || data.profile_image || memoryProfile.avatar,
    email: data.email || memoryProfile.email,
    phone: data.phone || memoryProfile.phone,
    location: data.location || memoryProfile.location,
    socialLinks: {
      github: data.github_url || memoryProfile.socialLinks.github,
      linkedin: data.linkedin_url || memoryProfile.socialLinks.linkedin,
      email: data.email ? `mailto:${data.email}` : memoryProfile.socialLinks.email,
    },
  };

  return getProfile();
};

module.exports = {
  getProfile,
  updateProfile,
};
