const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const email = process.argv[2];
const password = process.argv[3];
const name = process.argv[4] || 'Admin';

if (!email || !password) {
  console.log('\n❌ Usage: node scripts/createAdmin.js <email> <password> [name]');
  console.log('Example: node scripts/createAdmin.js hassan@example.com mySecretPass123 "Hassan Iqbal"\n');
  process.exit(1);
}

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
};

async function createAdmin() {
  let connection;
  try {
    connection = await mysql.createConnection(DB_CONFIG);
    console.log(`[DB] Connected to MySQL (${DB_CONFIG.database})`);

    // 1. Hash the password with bcrypt
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 2. Insert or update admin in the database
    const sql = `
      INSERT INTO admins (name, email, password_hash, role)
      VALUES (?, ?, ?, 'admin')
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        password_hash = VALUES(password_hash),
        role = 'admin';
    `;

    await connection.execute(sql, [name, email.toLowerCase().trim(), passwordHash]);

    console.log('\n======================================================');
    console.log('🎉 [ADMIN CREATED / UPDATED SUCCESSFULLY]');
    console.log(`👤 Name:     ${name}`);
    console.log(`📧 Email:    ${email.toLowerCase().trim()}`);
    console.log(`🔑 Role:     admin`);
    console.log(`🛡️ Access:   Exclusive Admin Panel Access`);
    console.log('======================================================\n');
  } catch (error) {
    console.error('\n❌ Error creating admin user:', error.message);
    process.exitCode = 1;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createAdmin();
