const app = require('./app');
const env = require('./config/env');
const logger = require('./utils/logger');
const { testConnection, pool } = require('./config/db');

const PORT = env.PORT || 5000;

let server;

const startServer = () => {
  // Start HTTP Listener immediately for zero downtime
  server = app.listen(PORT, () => {
    logger.info(`========================================================`);
    logger.info(`⚡ Portfolio Backend API running on port ${PORT}`);
    logger.info(`🌍 Environment: ${env.NODE_ENV}`);
    logger.info(`🔗 Base URL: http://localhost:${PORT}/api`);
    logger.info(`🩺 Health Check: http://localhost:${PORT}/api/health`);
    logger.info(`========================================================`);
  });

  // Test MySQL connection asynchronously
  testConnection()
    .then((dbConnected) => {
      if (dbConnected) {
        logger.info('[DATABASE] Production MySQL connection ready.');
      } else {
        logger.warn('[DATABASE] Server running in resilient in-memory fallback mode.');
      }
    })
    .catch((err) => {
      logger.warn(`[DATABASE] Connection check error: ${err.message}`);
    });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`, { stack: err.stack });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
    process.exit(1);
  });
};

// Graceful Shutdown
const gracefulShutdown = async (signal) => {
  logger.info(`Received ${signal}. Shutting down HTTP server gracefully...`);
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed.');
      try {
        await pool.end();
        logger.info('MySQL connection pool closed.');
      } catch (err) {
        logger.error(`Error closing MySQL pool: ${err.message}`);
      }
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

startServer();
