import express from "express";
import { login, register } from "../controllers/auth_controller.js";
import {
  loginValidator,
  registerValidator,
} from "@/validator/auth_validator.js";
import { validator } from "@/middleware/validator.js";

const router = express.Router();

router.post("/auth/register", registerValidator, validator, register);
router.post("/auth/login", loginValidator, validator, login);

export default router;
