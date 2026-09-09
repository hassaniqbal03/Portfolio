-- =====================================================================
-- ⚠️ WARNING: DEVELOPMENT ONLY DATABASE RESET SCRIPT
-- =====================================================================
-- DO NOT RUN THIS SCRIPT ON PRODUCTION.
-- This script completely DROPS AND RECREATES the `portfolio_db` database,
-- destroying all existing records, test data, and user messages.
-- =====================================================================

-- 1. Disable foreign key checks to prevent lockouts during teardown
SET foreign_key_checks = 0;

-- 2. Drop the existing database
DROP DATABASE IF EXISTS `portfolio_db`;

-- 3. Recreate the empty database with UTF-8 support
CREATE DATABASE `portfolio_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `portfolio_db`;

-- 4. Re-enable foreign key checks
SET foreign_key_checks = 1;

-- =====================================================================
-- NEXT STEPS TO RE-POPULATE:
-- Run `schema.sql` to re-create all 11 tables.
-- Run `seed.sql` to re-populate initial development records.
--
-- CLI Shortcut:
--   mysql -u root -p < database/reset.sql
--   mysql -u root -p < database/schema.sql
--   mysql -u root -p < database/seed.sql
-- =====================================================================
