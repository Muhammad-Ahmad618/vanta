import express from "express";
import {
  createNewWorkspace,
  fetchEveryWorkspace,
  removeWorkspace,
  fetchWorkspaceMembers,
  kickoutWorkspaceMember,
  inviteWorkspaceMember,
  transferOwnership,
  leaveWorkspace,
} from "../controllers/workspace_controller.js";
import { authorize } from "@/middleware/authorization.js";
import { protect } from "@/middleware/authentication.js";
import { validator } from "@/middleware/validator.js";
import { createWorkspaceValidator } from "@/validator/workspace_validator.js";

const router = express.Router();

router.post(
  "/workspace",
  protect,
  createWorkspaceValidator,
  validator,
  createNewWorkspace,
);
router.get("/workspace", protect, authorize("admin"), fetchEveryWorkspace);
router.delete("/workspace/:id", protect, authorize("admin"), removeWorkspace);
router.get("/workspace/:id/members", protect, fetchWorkspaceMembers);
router.delete(
  "/workspace/:workspace_id/member/:id",
  protect,
  kickoutWorkspaceMember,
);
router.post("/workspace/invite", protect, inviteWorkspaceMember);
router.post("/workspace/transfer-ownership", protect, transferOwnership);
router.post("/workspace/leave", protect, leaveWorkspace);

export default router;
