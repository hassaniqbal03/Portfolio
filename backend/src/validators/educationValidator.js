const { body } = require('express-validator');

const educationValidator = [
  body('degree')
    .trim()
    .notEmpty().withMessage('Degree or certification name is required')
    .isLength({ max: 200 }),
  body('institution')
    .trim()
    .notEmpty().withMessage('Institution is required')
    .isLength({ max: 200 }),
  body().custom((val, { req }) => {
    const start = req.body.start_year || req.body.startYear;
    if (!start || String(start).trim() === '') {
      throw new Error('Start year is required');
    }
    return true;
  }),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
];

module.exports = {
  educationValidator,
};
