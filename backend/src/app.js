const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const env = require('./config/env');
const logger = require('./utils/logger');
const { apiLimiter } = require('./middleware/rateLimiter');
const { errorHandler, notFoundHandler } = require('./middleware/errorMiddleware');
const routes = require('./routes');

const app = express();

// 1. Security Headers with Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// 2. CORS Configuration with Credential Support
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
];

if (env.FRONTEND_URL) {
  env.FRONTEND_URL.split(',').forEach((url) => {
    const trimmed = url.trim();
    if (trimmed && !allowedOrigins.includes(trimmed)) {
      allowedOrigins.push(trimmed);
    }
  });
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // In development, accept all origins for developer convenience
        if (env.NODE_ENV !== 'production') {
          callback(null, true);
        } else {
          callback(new Error(`CORS origin '${origin}' not permitted`));
        }
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// 3. Request Body & Cookie Parsers
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());

// 4. Request Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// 5. Rate Limiting on /api
app.use('/api', apiLimiter);

// 6. Mount Central API Routes
app.use('/api', routes);

// Root Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: '🚀 Muhammad Hassan Iqbal Portfolio Backend API is live!',
    documentation: '/api',
    health: '/api/health',
    frontend: 'http://localhost:3001',
  });
});

// 7. 404 Catch-All & Error Handler
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
