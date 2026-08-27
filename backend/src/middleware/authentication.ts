import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decodedToken === "string") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decodedToken as {
      id: number;
      role: "user" | "admin";
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};
