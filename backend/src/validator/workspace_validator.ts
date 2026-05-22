import { body } from "express-validator";

export const createWorkspaceValidator = [
  body("workspace_name")
    .notEmpty()
    .withMessage("Workspace name is required")
    .isLength({ min: 4 })
    .withMessage("Workspace name must be at least 4 characters long"),
];
