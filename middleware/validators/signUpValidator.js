const { body } = require("express-validator");

const nullError = "cannot be empty";
const passwordError = "must contain minimum 8 characters";
const userNameError = "must contain minimum 6 characters";

const signUpValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage(`Username ${nullError}`)
    .isLength({ min: 6 })
    .withMessage(`Username ${userNameError}`),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`Email ${nullError}`)
    .isEmail()
    .withMessage("Email must be a valid address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`Password ${nullError}`)
    .isLength({ min: 6 })
    .withMessage(`Password ${passwordError}`),
];

module.exports = signUpValidator;