-- =====================================================================
-- SEED DATA: portfolio_db
-- Seed script for development and initial deployment
-- Populated with authentic credentials from Muhammad Hassan Iqbal's CV
-- Idempotent: Can be run multiple times safely without duplicate key errors
-- =====================================================================

USE `portfolio_db`;

-- ---------------------------------------------------------------------
-- 1. SEED ADMIN ACCOUNT
-- Development Administrator Account:
-- Email: admin@portfolio.dev
-- Default Password: admin123
-- Stored as bcrypt hash (salt work factor 10):
-- $2a$10$tZ2P0u2OcfFj.KkK3yF/Ueg6nZ6r4P6F1E3A5y9c8e2Z4c0D2f2G2
-- ---------------------------------------------------------------------
INSERT INTO `admins` (`id`, `name`, `email`, `password_hash`, `role`)
VALUES (
  1,
  'Muhammad Hassan Iqbal',
  'admin@portfolio.dev',
  '$2a$10$tZ2P0u2OcfFj.KkK3yF/Ueg6nZ6r4P6F1E3A5y9c8e2Z4c0D2f2G2',
  'admin'
)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- ---------------------------------------------------------------------
-- 2. SEED PROFILE
-- Primary Portfolio Owner Record (from ATS CV)
-- ---------------------------------------------------------------------
INSERT INTO `profile` (
  `id`,
  `name`,
  `professional_title`,
  `status`,
  `short_bio`,
  `full_bio`,
  `journey`,
  `interests`,
  `philosophy`,
  `profile_image`,
  `email`,
  `phone`,
  `location`,
  `github_url`,
  `linkedin_url`,
  `cv_url`
) VALUES (
  1,
  'Muhammad Hassan Iqbal',
  'Full Stack Software Engineer',
  'Available for projects & full-time roles',
  'Detail-oriented Full Stack Developer building scalable, secure web applications using Node.js, React.js, Next.js, and modern MySQL architectures.',
  'I am a dedicated Full Stack Software Engineer specializing in constructing interactive, high-performance web applications and scalable software systems. My core expertise centers around React, Next.js, Node.js, Express, and modern relational databases like MySQL. Adept at designing RESTful APIs, implementing robust authentication systems, and developing responsive user interfaces with clean architecture.',
  'With hands-on experience building scalable applications at 7KingsCode and Icommunix, I focus on clean system design, component reusability, and secure RESTful APIs.',
  'Distributed systems, full-stack architectures, API performance tuning, secure authentication protocols, and scalable cloud solutions.',
  'I believe in writing clean, maintainable, and self-documenting code paired with thoughtful design aesthetics. Every line of code should prioritize speed, accessibility, and robust reliability.',
  '/profile.jpg',
  'mhassaniqbal18@gmail.com',
  '+92 3222765632',
  'Lahore, Pakistan',
  'https://github.com/hassaniqbalo3',
  'https://linkedin.com/in/muhammad-hassan-iqbal',
  '/M_HASSAN_IQBAL_ATS_CV.pdf'
)
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `professional_title` = VALUES(`professional_title`),
  `status` = VALUES(`status`),
  `short_bio` = VALUES(`short_bio`),
  `full_bio` = VALUES(`full_bio`),
  `journey` = VALUES(`journey`),
  `interests` = VALUES(`interests`),
  `philosophy` = VALUES(`philosophy`),
  `profile_image` = VALUES(`profile_image`),
  `email` = VALUES(`email`),
  `phone` = VALUES(`phone`),
  `location` = VALUES(`location`),
  `github_url` = VALUES(`github_url`),
  `linkedin_url` = VALUES(`linkedin_url`),
  `cv_url` = VALUES(`cv_url`);

-- ---------------------------------------------------------------------
-- 3. SEED SKILLS
-- Categorized capabilities from CV
-- ---------------------------------------------------------------------
INSERT INTO `skills` (`id`, `name`, `category`, `icon`, `proficiency`, `display_order`) VALUES
  -- Frontend
  (1, 'React.js', 'Frontend', 'Atom', 95, 1),
  (2, 'Next.js (App Router)', 'Frontend', 'Layers', 92, 2),
  (3, 'Redux Toolkit', 'Frontend', 'Box', 88, 3),
  (4, 'Tailwind CSS', 'Frontend', 'Sparkles', 92, 4),
  (5, 'HTML5 & CSS3', 'Frontend', 'Layout', 96, 5),
  
  -- Backend
  (6, 'Node.js', 'Backend', 'Server', 92, 6),
  (7, 'Express.js', 'Backend', 'Cpu', 90, 7),
  (8, 'RESTful APIs', 'Backend', 'Network', 94, 8),
  (9, 'Laravel', 'Backend', 'Flame', 85, 9),
  (10, 'Authentication (JWT)', 'Backend', 'ShieldCheck', 90, 10),

  -- Languages
  (11, 'JavaScript (ES6+)', 'Languages', 'Code2', 95, 11),
  (12, 'TypeScript', 'Languages', 'Code2', 90, 12),
  (13, 'PHP', 'Languages', 'Cpu', 85, 13),
  (14, 'SQL', 'Languages', 'Database', 92, 14),

  -- Database
  (15, 'MySQL Database Modeling', 'Database', 'Database', 92, 15),
  (16, 'Query Optimization & Indexing', 'Database', 'Table', 88, 16),

  -- Tools & Cloud
  (17, 'Git & GitHub', 'Tools & Cloud', 'GitBranch', 92, 17),
  (18, 'AWS Lambda', 'Tools & Cloud', 'Cloud', 82, 18)
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `category` = VALUES(`category`),
  `icon` = VALUES(`icon`),
  `proficiency` = VALUES(`proficiency`),
  `display_order` = VALUES(`display_order`);

-- ---------------------------------------------------------------------
-- 4. SEED EXPERIENCES
-- Professional Work Timeline from CV
-- ---------------------------------------------------------------------
INSERT INTO `experiences` (`id`, `job_title`, `company`, `employment_type`, `start_date`, `end_date`, `description`, `display_order`) VALUES
  (
    1,
    'FrontEnd Developer',
    '7KingsCode',
    'Full-time',
    '04/2026',
    NULL,
    'Developed scalable and reusable user interface components utilizing React.js, significantly improving development efficiency and application maintainability. Integrated REST APIs and effectively managed asynchronous data flow and state management across the application. Enhanced overall user experience (UX) by implementing responsive design principles and optimizing component rendering for faster load times. Applied software engineering best practices for clean code, structured component architecture, and long-term maintainability. Built interactive client-side features with comprehensive form validation, error handling, and real-time user feedback mechanisms.',
    1
  ),
  (
    2,
    'Backend Development Intern',
    'Icommunix',
    'Internship',
    '12/2024',
    '06/2025',
    'Built and maintained RESTful APIs utilizing Node.js and MySQL to support cross-functional web application requirements. Managed robust backend logic for secure user authentication, session management, and authorization workflows. Contributed to the development and optimization of highly secure and scalable backend modules. Configured and deployed backend serverless functions utilizing AWS Lambda for scalable execution.',
    2
  )
ON DUPLICATE KEY UPDATE
  `job_title` = VALUES(`job_title`),
  `company` = VALUES(`company`),
  `employment_type` = VALUES(`employment_type`),
  `start_date` = VALUES(`start_date`),
  `end_date` = VALUES(`end_date`),
  `description` = VALUES(`description`),
  `display_order` = VALUES(`display_order`);

-- ---------------------------------------------------------------------
-- 5. SEED EDUCATION
-- Degrees and Credentials from CV
-- ---------------------------------------------------------------------
INSERT INTO `education` (`id`, `degree`, `institution`, `start_year`, `end_year`, `description`, `relevant_information`, `display_order`) VALUES
  (
    1,
    'BS (Information Technology)',
    'University of Education | Lahore, Pakistan',
    '2020',
    '2024',
    'Comprehensive 4-year degree in Information Technology with specialized focus on software architecture, relational databases, distributed systems, and computer network protocols.',
    'Software Engineering, Object-Oriented Programming (OOP), Databases, Networking, Cloud Computing, Data Mining, Advanced Programming',
    1
  )
ON DUPLICATE KEY UPDATE
  `degree` = VALUES(`degree`),
  `institution` = VALUES(`institution`),
  `start_year` = VALUES(`start_year`),
  `end_year` = VALUES(`end_year`),
  `description` = VALUES(`description`),
  `relevant_information` = VALUES(`relevant_information`),
  `display_order` = VALUES(`display_order`);

-- ---------------------------------------------------------------------
-- 6. SEED TECHNOLOGIES
-- Master List of Reusable Technologies
-- ---------------------------------------------------------------------
INSERT INTO `technologies` (`id`, `name`, `icon`) VALUES
  (1, 'React.js', 'Atom'),
  (2, 'Next.js', 'Layers'),
  (3, 'TypeScript', 'Code2'),
  (4, 'JavaScript (ES6+)', 'Code2'),
  (5, 'Node.js', 'Server'),
  (6, 'Express.js', 'Cpu'),
  (7, 'MySQL', 'Database'),
  (9, 'Tailwind CSS', 'Sparkles'),
  (10, 'Laravel', 'Flame'),
  (11, 'PHP', 'Code'),
  (12, 'HTML5 & CSS3', 'Layout'),
  (13, 'Git & GitHub', 'GitBranch'),
  (14, 'AWS Lambda', 'Cloud'),
  (15, 'RESTful APIs', 'Network'),
  (16, 'Redux Toolkit', 'Box'),
  (17, 'Joi Validation', 'ShieldCheck'),
  (18, 'Crypto.js Encryption', 'Lock')
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- ---------------------------------------------------------------------
-- 7. SEED PROJECTS
-- Showcase Projects from CV with Unique Slugs
-- ---------------------------------------------------------------------
INSERT INTO `projects` (
  `id`,
  `title`,
  `slug`,
  `short_description`,
  `detailed_description`,
  `image_url`,
  `github_url`,
  `live_url`,
  `category`,
  `featured`,
  `display_order`
) VALUES
  (
    1,
    'CWS Headless CMS Platform',
    'cws-headless-sitecore-cms',
    'Scalable enterprise headless CMS web application built with Next.js, Sitecore, GraphQL, and TypeScript for high-performance content delivery.',
    'Contributed to a scalable, headless CMS-based web application leveraging Next.js and Sitecore. Engineered reusable React.js components adhering to modern frontend development practices and strictly typed with TypeScript. Improved application responsiveness and visual interface aesthetics utilizing Tailwind CSS. Collaborated within a team environment utilizing Git version control and continuous deployment workflows.',
    '/images/cws-headless-cms.jpg',
    'https://github.com/hassaniqbalo3',
    'https://www.cws.com/de-DE',
    'frontend',
    TRUE,
    1
  ),
  (
    2,
    'Secure Login & User CRUD System',
    'secure-login-crud-system',
    'Robust backend application featuring comprehensive CRUD user management, strict Joi input validation, Crypto.js password encryption, and optimized MySQL queries.',
    'Developed a secure backend application featuring comprehensive CRUD functionality for robust user management. Implemented strict input validation methodologies using Joi to ensure data integrity and prevent malformed requests. Encrypted user credentials securely leveraging Crypto.js to enforce high-level authentication standards. Designed and optimized SQL queries to facilitate highly efficient database interactions and data retrieval. Exposed REST APIs to manage authentication protocols and administrative user operations effectively.',
    '/images/secure-login-crud.jpg',
    'https://github.com/hassaniqbalo3',
    'https://github.com/hassaniqbalo3',
    'backend',
    TRUE,
    2
  )
ON DUPLICATE KEY UPDATE
  `title` = VALUES(`title`),
  `short_description` = VALUES(`short_description`),
  `detailed_description` = VALUES(`detailed_description`),
  `image_url` = VALUES(`image_url`),
  `github_url` = VALUES(`github_url`),
  `live_url` = VALUES(`live_url`),
  `category` = VALUES(`category`),
  `featured` = VALUES(`featured`),
  `display_order` = VALUES(`display_order`);

-- ---------------------------------------------------------------------
-- 8. SEED PROJECT_TECHNOLOGIES (Many-to-Many Mappings)
-- ---------------------------------------------------------------------
INSERT IGNORE INTO `project_technologies` (`project_id`, `technology_id`) VALUES
  -- Project 1 (CWS Headless CMS): React.js, Next.js, TypeScript, Tailwind CSS
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 9),

  -- Project 2 (Secure Login & User CRUD): Node.js, Express.js, MySQL, REST APIs, Joi, Crypto.js
  (2, 5),
  (2, 6),
  (2, 7),
  (2, 15),
  (2, 17),
  (2, 18);

-- ---------------------------------------------------------------------
-- 9. SEED CONTACT MESSAGES
-- Sample Inquiries for Admin Inbox
-- ---------------------------------------------------------------------
INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `message`, `is_read`, `created_at`) VALUES
  (
    1,
    'Sarah Jenkins',
    'sarah.jenkins@techventures.co',
    'Full Stack Engineering Opportunity - React & Node.js',
    'Hi Hassan, we came across your portfolio and were very impressed with your Headless CMS and REST API architectures. We are looking for an engineer to join our software team. Are you open for a discovery call this week?',
    FALSE,
    DATE_SUB(NOW(), INTERVAL 4 HOUR)
  )
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- ---------------------------------------------------------------------
-- 10. SEED CHAT CONVERSATIONS & MESSAGES
-- ---------------------------------------------------------------------
INSERT INTO `chat_conversations` (`id`, `session_id`, `created_at`) VALUES
  (1, 'sess_demo_visitor_101', DATE_SUB(NOW(), INTERVAL 2 HOUR))
ON DUPLICATE KEY UPDATE `session_id` = VALUES(`session_id`);

INSERT INTO `chat_messages` (`id`, `conversation_id`, `sender`, `message`, `created_at`) VALUES
  (
    1,
    1,
    'user',
    'What technologies does Hassan specialize in?',
    DATE_SUB(NOW(), INTERVAL 2 HOUR)
  ),
  (
    2,
    1,
    'assistant',
    'Muhammad Hassan Iqbal is a Full Stack Software Engineer specializing in React.js, Next.js, Node.js, Express.js, Laravel, and MySQL database architectures.',
    DATE_SUB(NOW(), INTERVAL 119 MINUTE)
  )
ON DUPLICATE KEY UPDATE `message` = VALUES(`message`);
