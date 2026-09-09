const { body } = require('express-validator');

const chatValidator = [
  body('message')
    .trim()
    .notEmpty().withMessage('Chat message cannot be empty')
    .isLength({ max: 1000 }).withMessage('Message is too long. Please keep questions under 1000 characters.'),
];

module.exports = {
  chatValidator,
};
