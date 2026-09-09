const rateLimit = require('express-rate-limit');
const { sendError } = require('../utils/response');

// General rate limiter for all public endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // max 200 requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(res, 'Too many requests from this IP. Please try again later.', 429);
  },
});

// Stricter rate limiter specifically for AI Chatbot endpoint
const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20, // max 20 chat requests per 10 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(res, 'You have reached the AI chat rate limit. Please wait a few minutes before asking another question.', 429);
  },
});

// Stricter rate limiter for Login to prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 failed/successful login attempts per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(res, 'Too many login attempts. Please try again after 15 minutes.', 429);
  },
});

module.exports = {
  apiLimiter,
  chatLimiter,
  authLimiter,
};
