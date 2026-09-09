const { body } = require('express-validator');

const contactValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Your name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('subject')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ max: 255 }).withMessage('Subject must not exceed 255 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message content is required')
    .isLength({ min: 1, max: 10000 }).withMessage('Message must be between 1 and 10000 characters'),
];

module.exports = {
  contactValidator,
};
