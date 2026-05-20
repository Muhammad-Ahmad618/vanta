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

const router = express.Router();

router.post("/workspace", createNewWorkspace);
router.get("/workspace", fetchEveryWorkspace);
router.delete("/workspace/:id", removeWorkspace);
router.get("/workspace/:id/members", fetchWorkspaceMembers);
router.delete("/workspace/:workspace_id/member/:id", kickoutWorkspaceMember);
router.post("/workspace/invite", inviteWorkspaceMember);
router.post("/workspace/transfer-ownership", transferOwnership);
router.post("/workspace/leave", leaveWorkspace);

export default router;
