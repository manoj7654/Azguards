const { body } = require('express-validator');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerValidation = [
  body('email')
    .matches(emailRegex)
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const loginValidation = [
  body('email')
    .matches(emailRegex)
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

module.exports = { registerValidation, loginValidation };
