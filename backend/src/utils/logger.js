const env = require('../config/env');

const SENSITIVE_FIELDS = ['password', 'password_hash', 'token', 'jwt_secret', 'ai_api_key'];

const sanitizeData = (data) => {
  if (!data || typeof data !== 'object') return data;
  const copy = Array.isArray(data) ? [...data] : { ...data };
  for (const key of Object.keys(copy)) {
    if (SENSITIVE_FIELDS.includes(key.toLowerCase())) {
      copy[key] = '***REDACTED***';
    } else if (typeof copy[key] === 'object') {
      copy[key] = sanitizeData(copy[key]);
    }
  }
  return copy;
};

const logger = {
  info: (msg, meta) => {
    console.log(`[INFO] [${new Date().toISOString()}] ${msg}`, meta ? sanitizeData(meta) : '');
  },
  warn: (msg, meta) => {
    console.warn(`[WARN] [${new Date().toISOString()}] ${msg}`, meta ? sanitizeData(meta) : '');
  },
  error: (msg, meta) => {
    console.error(`[ERROR] [${new Date().toISOString()}] ${msg}`, meta ? sanitizeData(meta) : '');
  },
  http: (msg) => {
    console.log(`[HTTP] [${new Date().toISOString()}] ${msg}`);
  },
  debug: (msg, meta) => {
    if (env.NODE_ENV !== 'production') {
      console.log(`[DEBUG] [${new Date().toISOString()}] ${msg}`, meta ? sanitizeData(meta) : '');
    }
  },
};

module.exports = logger;
