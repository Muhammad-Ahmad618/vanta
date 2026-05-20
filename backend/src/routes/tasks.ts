import express from "express";
import {
  fetchAllTasks,
  fetchTasksByCreatorId,
  AddNewTask,
  updateTaskDetails,
  updateTaskStatus,
  removeTask,
  fetchAssignedTasks,
} from "../controllers/task_controller.js";

const router = express.Router();

router.get("/task", fetchAllTasks);
router.post("/task", AddNewTask);
router.put("/task/:id", updateTaskDetails);
router.patch("/task/:id/status", updateTaskStatus);
router.delete("/task/:id", removeTask);
router.get("/task/creator/:id", fetchTasksByCreatorId);
router.get("/task/assigned/:id", fetchAssignedTasks);

export default router;
