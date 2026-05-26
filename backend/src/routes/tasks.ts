import express from "express";
import {
  fetchAllTasks,
  fetchTasksByCreatorId,
  AddNewTask,
  updateTaskDetails,
  updateTaskStatus,
  removeTask,
  fetchAssignedTasks,
  hardDeleteTaskController,
  recoverTask,
} from "../controllers/task_controller.js";
import { protect } from "@/middleware/authentication.js";
import { authorize } from "@/middleware/authorization.js";

const router = express.Router();

router.get("/task", protect, authorize("admin"), fetchAllTasks);
router.post("/task", protect, AddNewTask);
router.put("/task/:id", protect, updateTaskDetails);
router.patch("/task/:id/status", protect, updateTaskStatus);
router.delete("/task/:id", protect, removeTask);
router.delete("/task/:id/hard", protect, authorize("admin"), hardDeleteTaskController);
router.post("/task/recover/:id", protect, authorize("admin"), recoverTask);
router.get("/task/creator/:id", protect, fetchTasksByCreatorId);
router.get("/task/assigned/:id", protect, fetchAssignedTasks);

export default router;
