const { body } = require('express-validator');

const todoCreateValidation = [
  body('description')
    .notEmpty()
    .withMessage('Description must not be empty')
    .isLength({ max: 255 })
    .withMessage('Description must be less than 255 characters long'),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Status must be either "pending" or "completed"')
];

const todoUpdateValidation = [
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description must not be empty')
    .isLength({ max: 255 })
    .withMessage('Description must be less than 255 characters long'),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Status must be either "pending" or "completed"')
];

module.exports = { todoCreateValidation, todoUpdateValidation };
