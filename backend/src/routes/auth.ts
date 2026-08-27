import express from "express";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  logout,
  refresh,
} from "../controllers/auth_controller.js";
import {
  loginValidator,
  registerValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from "@/validator/auth_validator.js";
import { validator } from "@/middleware/validator.js";

const router = express.Router();

router.post("/auth/register", registerValidator, validator, register);
router.post("/auth/login", loginValidator, validator, login);
router.post(
  "/auth/forgot-password",
  forgotPasswordValidator,
  validator,
  forgotPassword,
);
router.post(
  "/auth/reset-password",
  resetPasswordValidator,
  validator,
  resetPassword,
);
router.post("/auth/logout", logout);
router.post("/refresh", refresh);

export default router;
