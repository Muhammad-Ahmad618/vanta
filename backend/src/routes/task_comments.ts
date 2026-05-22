import express from "express";
import {
  AddComment,
  deleteComment,
  fetchAllCommentsOfATask,
  updateComment,
} from "@/controllers/task_comment_controller.js";
import { protect } from "@/middleware/authentication.js";

const router = express.Router();

router.get("/tasks/:task_id/comments", protect, fetchAllCommentsOfATask);

router.post("/tasks/:task_id/comments", protect, AddComment);

router.delete("/comments/:id", protect, deleteComment);

router.put("/comments/:id", protect, updateComment);

export default router;
