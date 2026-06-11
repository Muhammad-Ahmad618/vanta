import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  getUserByEmail,
  createUser,
  checkUserExist,
  updatePassword,
  checkExistingPassword,
} from "@/models/users_model.js";
import { Request, Response } from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import {
  deleteToken,
  getTokenInfo,
  insertToken,
} from "@/models/password_reset_model.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await getUserByEmail(email);

  if (!user || user.deleted_at !== null) {
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
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
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
    if (existingUser.deleted_at !== null) {
      return res.status(400).json({
        message:
          "Account is deactivated. Please contact support or restore it.",
      });
    }
    return res
      .status(400)
      .json({ message: "account already register on this mail" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser(name, email, hashedPassword);

    return res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
};
// forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await checkUserExist(email);

    if (!user) {
      return res
        .status(200)
        .json({ message: "Password Reset Link Sent Please check your Inbox" });
    }

    const userId = user.id;

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const storeToken = await insertToken(userId, token, expiresAt);

    if (storeToken) {
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

      await transporter.sendMail({
        from: `"Your App" <${process.env.EMAIL}>`,
        to: email,
        subject: "Password Reset Request",
        html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password. It expires in 1 hour.</p>
        <a href="${resetUrl}" style="color: blue; text-decoration: underline;">Reset Password</a>
        <p>If you didn't request this, ignore this email.</p>
      `,
      });

      return res
        .status(200)
        .json({ message: "If that email exists, a reset link has been sent." });
    }
  } catch (error) {
    console.log("Error", error);
    return res
      .status(500)
      .json({ message: "Internal server error. Please try again." });
  }
};

// reset password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const tokenInfo = await getTokenInfo(token);

    if (!tokenInfo) {
      return res.status(400).json({ message: "invalid Token" });
    }

    const { user_id, expires_at } = tokenInfo;

    if (new Date() > new Date(expires_at)) {
      await deleteToken(token);
      return res.status(400).json({
        message: "Token has expired. Please request a new reset link.",
      });
    }

    const existingPassword = await checkExistingPassword(user_id);

    const isPasswordValid = await bcrypt.compare(newPassword, existingPassword);

    if (isPasswordValid) {
      return res
        .status(400)
        .json({ message: "New and Current Password cannot be the same" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await updatePassword(user_id, hashedPassword);

    await deleteToken(token);

    return res
      .status(200)
      .json({ message: "Password Updated successfully", data: user });
  } catch (error) {
    console.log("Error resetting password:", error);
    return res
      .status(500)
      .json({ message: "Error While Updating Password. Please Try Again" });
  }
};
