
CREATE DATABASE IF NOT EXISTS `portfolio_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `portfolio_db`;

-- Set SQL strict mode for production data integrity
SET foreign_key_checks = 0;

-- ---------------------------------------------------------------------
-- 1. ADMINS TABLE
-- Stores authorized administrators who can manage portfolio content
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'admin',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_admins_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 2. PROFILE TABLE
-- Stores the portfolio owner's biography, title, contact, and social URLs
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `professional_title` VARCHAR(200) NOT NULL,
  `status` VARCHAR(200) NOT NULL DEFAULT 'Available for projects & full-time roles',
  `short_bio` TEXT NOT NULL,
  `full_bio` TEXT NOT NULL,
  `journey` TEXT DEFAULT NULL,
  `interests` TEXT DEFAULT NULL,
  `philosophy` TEXT DEFAULT NULL,
  `profile_image` VARCHAR(500) DEFAULT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `location` VARCHAR(150) DEFAULT NULL,
  `github_url` VARCHAR(255) DEFAULT NULL,
  `linkedin_url` VARCHAR(255) DEFAULT NULL,
  `cv_url` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  'I am a dedicated Full Stack Software Engineer specializing in constructing interactive, high-performance web applications and scalable software systems. My core expertise centers around React, Next.js, Node.js, Express, and modern relational databases like MySQL. Adept at designing RESTful APIs, implementing robust authentication systems, and developing responsive user interfaces.',
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
-- 3. SKILLS TABLE
-- Categorized developer capabilities with visual icons and proficiency
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `skills`;
CREATE TABLE `skills` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `icon` VARCHAR(50) DEFAULT 'Layers',
  `proficiency` INT DEFAULT 85,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_skills_category` (`category`),
  INDEX `idx_skills_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 4. EXPERIENCES TABLE
-- Work history timeline (end_date NULL denotes current position)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `experiences`;
CREATE TABLE `experiences` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `job_title` VARCHAR(150) NOT NULL,
  `company` VARCHAR(150) NOT NULL,
  `employment_type` VARCHAR(50) NOT NULL DEFAULT 'Full-time',
  `start_date` VARCHAR(50) NOT NULL,
  `end_date` VARCHAR(50) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_experiences_start_date` (`start_date`),
  INDEX `idx_experiences_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 5. EDUCATION TABLE
-- Academic degrees, professional certifications, and coursework
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `education`;
CREATE TABLE `education` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `degree` VARCHAR(200) NOT NULL,
  `institution` VARCHAR(200) NOT NULL,
  `start_year` VARCHAR(20) NOT NULL,
  `end_year` VARCHAR(20) DEFAULT NULL,
  `description` TEXT NOT NULL,
  `relevant_information` TEXT DEFAULT NULL,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_education_start_year` (`start_year`),
  INDEX `idx_education_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 6. PROJECTS TABLE
-- Portfolio projects showcase with unique slugs for SEO route pages
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `slug` VARCHAR(200) NOT NULL UNIQUE,
  `short_description` VARCHAR(500) NOT NULL,
  `detailed_description` TEXT DEFAULT NULL,
  `image_url` VARCHAR(500) DEFAULT NULL,
  `github_url` VARCHAR(500) DEFAULT NULL,
  `live_url` VARCHAR(500) DEFAULT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'fullstack',
  `featured` BOOLEAN NOT NULL DEFAULT FALSE,
  `display_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_projects_slug` (`slug`),
  INDEX `idx_projects_category` (`category`),
  INDEX `idx_projects_featured` (`featured`),
  INDEX `idx_projects_display_order` (`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 7. TECHNOLOGIES TABLE
-- Reusable technology master catalog (React, Next.js, Node.js, etc.)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `technologies`;
CREATE TABLE `technologies` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `icon` VARCHAR(50) DEFAULT 'Cpu',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_technologies_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 8. PROJECT_TECHNOLOGIES TABLE (Many-to-Many Relationship)
-- Maps projects to multiple technologies with cascading deletions
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `project_technologies`;
CREATE TABLE `project_technologies` (
  `project_id` INT NOT NULL,
  `technology_id` INT NOT NULL,
  PRIMARY KEY (`project_id`, `technology_id`),
  CONSTRAINT `fk_pt_project`
    FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pt_technology`
    FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_pt_project_id` (`project_id`),
  INDEX `idx_pt_technology_id` (`technology_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 9. CONTACT_MESSAGES TABLE
-- Inquiries submitted by portfolio visitors through the contact form
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `is_read` BOOLEAN NOT NULL DEFAULT FALSE,
  `status` VARCHAR(20) NOT NULL DEFAULT 'unread',
  `ip_address` VARCHAR(45) DEFAULT '127.0.0.1',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_contact_messages_is_read` (`is_read`),
  INDEX `idx_contact_messages_status` (`status`),
  INDEX `idx_contact_messages_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 10. CHAT_CONVERSATIONS TABLE
-- Visitor chatbot conversation sessions
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `chat_conversations`;
CREATE TABLE `chat_conversations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `session_id` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_chat_conversations_session_id` (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 11. CHAT_MESSAGES TABLE
-- Dialogue messages exchanged between visitors and the AI assistant
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS `chat_messages`;
CREATE TABLE `chat_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `conversation_id` INT NOT NULL,
  `sender` ENUM('user', 'assistant') NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_cm_conversation`
    FOREIGN KEY (`conversation_id`) REFERENCES `chat_conversations` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE,
  INDEX `idx_chat_messages_conversation_id` (`conversation_id`),
  INDEX `idx_chat_messages_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 12. SEED ADMIN ACCOUNT
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
-- 13. SEED SKILLS (From ATS CV)
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
-- 14. SEED EXPERIENCES (From ATS CV)
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
-- 15. SEED EDUCATION (From ATS CV)
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
-- 16. SEED TECHNOLOGIES CATALOG
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
-- 17. SEED PROJECTS (From ATS CV)
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
-- 18. SEED PROJECT_TECHNOLOGIES (Many-to-Many Mappings)
-- ---------------------------------------------------------------------
INSERT IGNORE INTO `project_technologies` (`project_id`, `technology_id`) VALUES
  (1, 1), (1, 2), (1, 3), (1, 9),
  (2, 5), (2, 6), (2, 7), (2, 15), (2, 17), (2, 18);

SET foreign_key_checks = 1;

-- ---------------------------------------------------------------------
-- Verification Queries
-- ---------------------------------------------------------------------
SELECT 'admins' AS `table`, COUNT(*) AS `rows` FROM `admins`
UNION ALL
SELECT 'profile', COUNT(*) FROM `profile`
UNION ALL
SELECT 'skills', COUNT(*) FROM `skills`
UNION ALL
SELECT 'experiences', COUNT(*) FROM `experiences`
UNION ALL
SELECT 'education', COUNT(*) FROM `education`
UNION ALL
SELECT 'technologies', COUNT(*) FROM `technologies`
UNION ALL
SELECT 'projects', COUNT(*) FROM `projects`
UNION ALL
SELECT 'project_technologies', COUNT(*) FROM `project_technologies`;