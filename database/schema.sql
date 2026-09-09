-- =====================================================================
-- DATABASE: portfolio_db
-- Professional Personal Portfolio Database Schema
-- Architecture: Next.js Frontend -> Express.js API -> MySQL Database
-- Character Set: utf8mb4 (Full Unicode, Multilingual, Urdu & Emojis)
-- Engine: InnoDB (ACID transactions, Row-level Locking, Foreign Keys)
-- =====================================================================

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

SET foreign_key_checks = 1;
