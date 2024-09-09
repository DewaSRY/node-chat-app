const { check } = require("express-validator");

module.exports = {
  requireUsername: check("username")
    .trim()
    .isLength({ min: 5, max: 40 })
    .withMessage("Must be between 5 and 40 characters"),
  requireEmail: check("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email"),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),
};
