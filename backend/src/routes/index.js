const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const skillRoutes = require('./skillRoutes');
const experienceRoutes = require('./experienceRoutes');
const educationRoutes = require('./educationRoutes');
const projectRoutes = require('./projectRoutes');
const contactRoutes = require('./contactRoutes');
const chatRoutes = require('./chatRoutes');
const { getIsConnected } = require('../config/db');

// Health Check Endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: getIsConnected() ? 'connected' : 'disconnected (in-memory mode active)',
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Directory Summary
router.get('/', (req, res) => {
  res.status(200).json({
    name: 'Muhammad Hassan Iqbal Portfolio API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      skills: '/api/skills',
      experience: '/api/experience',
      education: '/api/education',
      projects: '/api/projects',
      contact: '/api/contact',
      messages: '/api/messages',
      chat: '/api/chat',
      health: '/api/health'
    }
  });
});

// Mount Resource Routers
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);
router.use('/skills', skillRoutes);
router.use('/experience', experienceRoutes);
router.use('/education', educationRoutes);
router.use('/projects', projectRoutes);
router.use('/contact', contactRoutes);
router.use('/messages', contactRoutes); // Alias for contact messages
router.use('/chat', chatRoutes);

module.exports = router;
