const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true,
};

const DB_NAME = process.env.DB_NAME || 'portfolio_db';

async function initDatabase() {
  console.log(`[DB INIT] Connecting to MySQL server at ${DB_CONFIG.host}:${DB_CONFIG.port}...`);
  let connection;

  try {
    // 1. Connect without selecting database to ensure database exists
    connection = await mysql.createConnection(DB_CONFIG);
    console.log(`[DB INIT] Connected to MySQL successfully.`);

    console.log(`[DB INIT] Creating database \`${DB_NAME}\` if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE \`${DB_NAME}\`;`);

    // 2. Read and execute schema.sql from database/
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    console.log(`[DB INIT] Executing schema definitions from database/schema.sql (11 tables)...`);
    await connection.query(schemaSql);
    console.log(`[DB INIT] All 11 tables created successfully.`);

    // 3. Read and execute seed.sql from database/
    const seedPath = path.join(__dirname, '../../database/seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    console.log(`[DB INIT] Seeding development data from database/seed.sql...`);
    await connection.query(seedSql);
    console.log(`[DB INIT] Development data seeded successfully.`);

    console.log(`\n======================================================`);
    console.log(`🎉 [DB INIT] SUCCESS: Database '${DB_NAME}' is ready!`);
    console.log(`Admin account: admin@portfolio.dev | Password: admin123`);
    console.log(`Database tables: admins, profile, skills, experiences,`);
    console.log(`education, projects, technologies, project_technologies,`);
    console.log(`contact_messages, chat_conversations, chat_messages`);
    console.log(`======================================================\n`);

  } catch (error) {
    console.error(`❌ [DB INIT] Failed:`, error.message);
    process.exitCode = 1;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initDatabase();
