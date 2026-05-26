import express from "express";
import {
  AddComment,
  deleteComment,
  fetchAllCommentsOfATask,
  updateComment,
  hardDeleteComment,
  recoverComment,
} from "@/controllers/task_comment_controller.js";
import { protect } from "@/middleware/authentication.js";
import { authorize } from "@/middleware/authorization.js";

const router = express.Router();

router.get("/tasks/:task_id/comments", protect, fetchAllCommentsOfATask);

router.post("/tasks/:task_id/comments", protect, AddComment);

router.delete("/comments/:id", protect, deleteComment);
router.delete("/comments/:id/hard", protect, authorize("admin"), hardDeleteComment);
router.post("/comments/recover/:id", protect, authorize("admin"), recoverComment);


router.put("/comments/:id", protect, updateComment);

export default router;
