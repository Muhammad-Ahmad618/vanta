import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decodedToken === "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decodedToken as {
      id: number;
      email: string;
      role: "user" | "admin";
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
