const mysql = require('mysql2/promise');
const env = require('./env');

const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: false,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 3000,
  charset: 'utf8mb4',
});

let isConnected = false;

const testConnection = async () => {
  try {
    const connPromise = pool.getConnection();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timed out (3000ms)')), 3000)
    );
    const connection = await Promise.race([connPromise, timeoutPromise]);
    console.log(`[DATABASE] ✅ Successfully connected to MySQL (${env.DB_USER}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME})`);
    connection.release();
    isConnected = true;
    return true;
  } catch (error) {
    console.warn(`[DATABASE] ⚠️ Connection test to '${env.DB_NAME}' failed: ${error.message}`);
    console.warn(`[DATABASE] ℹ️ Update DB_PASSWORD in backend/.env to match your local MySQL installation.`);
    console.warn(`[DATABASE] ℹ️ Run 'npm run db:init' to create database and tables once credentials are set.`);
    isConnected = false;
    return false;
  }
};

const query = async (sql, params = []) => {
  if (!isConnected) {
    throw new Error('Database disconnected - falling back to resilient in-memory data store');
  }
  const [rows] = await pool.execute(sql, params);
  return rows;
};

module.exports = {
  pool,
  query,
  testConnection,
  getIsConnected: () => isConnected,
};
