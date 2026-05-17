import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validator = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Validation Failed", errors: errors.array() });
  }
  next();
};
