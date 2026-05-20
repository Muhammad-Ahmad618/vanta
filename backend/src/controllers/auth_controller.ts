import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail, createUser } from "@/models/users_model.js";
import { getErrorMessage } from "@/utils/error_handler.js";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  try {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    return res.status(200).json({
      message: "User logged in successfully",
      token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error. Please try again." });
  }
};

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "email, password and name are required" });
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "account already register on this mail" });
  }

  const hashedPassword = await bcrypt.hash(password, 20);

  try {
    const user = await createUser(name, email, hashedPassword);

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error. Please try again." });
  }
};
