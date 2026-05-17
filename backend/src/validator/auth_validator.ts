import { body } from "express-validator";

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password is too short"),
];

export const registerValidator = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password is too short"),
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 4 })
    .withMessage("name is too short"),
];
