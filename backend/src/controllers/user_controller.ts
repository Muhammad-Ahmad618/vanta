import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { getErrorMessage } from "@/utils/error_handler.js";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  checkExistingPassword,
  updatePassword,
  getUserByEmail,
} from "@/models/users_model.js";

export const fetchAllUsers = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const limitNum = limit ? Number(limit) : 10;
  const offsetNum = offset ? Number(offset) : 0;
  try {
    const users = await getAllUsers(limitNum, offsetNum);
    return res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    return res.status(500).json({ message: "Error While Fetching Users. Please Try Again" });
  }
};

export const fetchUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "email is required" });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User fetched successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error. Please Try Again" });
  }
};

export const fetchUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  try {
    const user = await getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User fetched successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error. Please Try Again" });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  try {
    const user = await deleteUser(Number(id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User deleted successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: "Error Deleting User. Please Try Again" });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "id is required" });
  }

  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: "Enter valid Password" });
  }

  const existingPassword = await checkExistingPassword(Number(id));

  const isPasswordValid = await bcrypt.compare(password, existingPassword);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ message: "New and Current Password cannot be the same" });
  }

  const hashedPassword = await bcrypt.hash(password, 20);

  try {
    const user = await updatePassword(Number(id), hashedPassword);
    return res
      .status(200)
      .json({ message: "Password Updated successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: "Error While Updating Password. Please Try Again" });
  }
};
