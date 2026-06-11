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
  getDailyFocus,
  saveTaskBreakdown,
  breakdownTask,
  getRiskReport,
} from "../controllers/task_controller.js";
import { protect } from "@/middleware/authentication.js";
import { authorize } from "@/middleware/authorization.js";

const router = express.Router();

router.get("/task", protect, authorize("admin"), fetchAllTasks);
router.post("/task", protect, AddNewTask);
router.put("/task/:id", protect, updateTaskDetails);
router.patch("/task/:id/status", protect, updateTaskStatus);
router.delete("/task/:id", protect, removeTask);
router.delete(
  "/task/:id/hard",
  protect,
  authorize("admin"),
  hardDeleteTaskController,
);
router.post("/task/recover/:id", protect, authorize("admin"), recoverTask);
router.get("/task/creator/:id", protect, fetchTasksByCreatorId);
router.get("/task/assigned/:id", protect, fetchAssignedTasks);

// Daily Focus
router.get("/task/focus", protect, getDailyFocus);

//Breakdown Routes
router.get("/task/:id/breakdown", protect, breakdownTask);
router.post("/task/:id/breakdown/save", protect, saveTaskBreakdown);

//Risk Routes
router.get("/task/risk", protect, getRiskReport);

export default router;
