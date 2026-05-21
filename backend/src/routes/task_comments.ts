import express from "express";
import { AddComment, deleteComment, fetchAllCommentsOfATask, updateComment } from "@/controllers/task_comment_controller.js";

const router = express.Router();

router.get('/tasks/:task_id/comments', fetchAllCommentsOfATask);

router.post('/tasks/:task_id/comments', AddComment);

router.delete('/comments/:id', deleteComment);

router.put('/comments/:id', updateComment);

export default router;