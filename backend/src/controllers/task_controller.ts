import { Request, Response } from "express";
import {
  generateDailyFocus,
  generateTaskBreakDown,
  generateRiskReport,
} from "@/services/ai_service.js";
import {
  changeTaskStatus,
  createTask,
  hardDeleteTask,
  getAllTasks,
  getTaskByAssignedTo,
  getTaskByUserId,
  updateTask,
  getTaskById,
  softDeleteTask,
  restoreTask,
  getDailyFocusTasks,
  saveSubTasks,
  getTaskBreakDown,
  getActiveTasksById,
} from "@/models/tasks_model.js";

// Fetch All Tasks Accross DB
export const fetchAllTasks = async (req: Request, res: Response) => {
  const { limit, offset, status } = req.query;
  const limitNum = limit ? Number(limit) : 10;
  const offsetNum = offset ? Number(offset) : 0;
  const statusVal = (status as "pending" | "Inprogress" | "completed") || null;

  try {
    const tasks = await getAllTasks(limitNum, offsetNum, statusVal);

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Occured while Fetching Task Please Try Again" });
  }
};

export const fetchTasksByCreatorId = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const limitNum = limit ? Number(limit) : 10;
  const offsetNum = offset ? Number(offset) : 0;
  const id = Number(req.params.id);

  try {
    const tasks = await getTaskByUserId(id, limitNum, offsetNum);

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error Please Try Again" });
  }
};

export const AddNewTask = async (req: Request, res: Response) => {
  const { title, description, workspace_id, assigned_to, priority, due_date } =
    req.body;
  const user_id = Number(req.user?.id);

  if (!title || !description || !priority || !due_date) {
    return res.status(400).json({
      message: "Please provide title and description and priority and due date",
    });
  }

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const task = await createTask(
      title,
      description,
      priority,
      due_date,
      user_id,
      workspace_id,
      assigned_to,
    );
    return res
      .status(200)
      .json({ message: "Task created successfully", data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Creating Task Please Try Again" });
  }
};

export const updateTaskDetails = async (req: Request, res: Response) => {
  const { title, description, status, assigned_to, priority, due_date } =
    req.body;
  const id = Number(req.params.id);
  const user_id = Number(req.user?.id);

  if (!title || !description || !status || !priority || !due_date) {
    return res.status(400).json({
      message: "Please provide title, description and status",
    });
  }

  if (!id) {
    return res.status(400).json({
      message: "Please provide task id",
    });
  }

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const task = await updateTask(
      id,
      user_id,
      title,
      description,
      status,
      assigned_to,
      priority,
      due_date,
    );
    return res
      .status(200)
      .json({ message: "Task updated successfully", data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Updating Task Details Please Try Again" });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const id = Number(req.params.id);
  const user_id = Number(req.user?.id);

  if (!status) {
    return res.status(400).json({
      message: "Please provide status",
    });
  }

  if (!id) {
    return res.status(400).json({
      message: "Please provide task id",
    });
  }

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const task = await changeTaskStatus(id, user_id, status);
    return res
      .status(200)
      .json({ message: "Task status changed successfully", data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Updating Task Status Please Try Again" });
  }
};

export const removeTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user_id = Number(req.user?.id);

  if (!id) {
    return res.status(400).json({
      message: "Please provide task id",
    });
  }

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const task = await getTaskById(id);
    if (!task || task.deleted_at !== null) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user?.role !== "admin" && task.user_id !== user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const result = await softDeleteTask(id);
    return res
      .status(200)
      .json({ message: "Task deleted successfully", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Deleting Task Please Try Again" });
  }
};

export const hardDeleteTaskController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({
      message: "Please provide task id",
    });
  }

  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const task = await hardDeleteTask(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: "Task hard deleted successfully", data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Hard Deleting Task Please Try Again" });
  }
};

export const recoverTask = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).json({
      message: "Please provide task id",
    });
  }

  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const task = await restoreTask(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res
      .status(200)
      .json({ message: "Task restored successfully", data: task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Restoring Task Please Try Again" });
  }
};

export const fetchAssignedTasks = async (req: Request, res: Response) => {
  const { status, limit, offset } = req.query;
  const limitNum = limit ? Number(limit) : 10;
  const offsetNum = offset ? Number(offset) : 0;
  const assignee_id = Number(req.params.id);

  if (!assignee_id || isNaN(assignee_id)) {
    return res.status(400).json({ message: "Invalid user ID provided" });
  }

  try {
    const tasks = await getTaskByAssignedTo(
      assignee_id,
      limitNum,
      offsetNum,
      status as "pending" | "Inprogress" | "completed" | null,
    );

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", data: tasks });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error Please Try Again" });
  }
};

export const getDailyFocus = async (req: Request, res: Response) => {
  const user_id = Number(req.user?.id);

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const tasks = await getDailyFocusTasks(user_id);
    const focus = await generateDailyFocus(tasks);

    return res.status(200).json({
      message: "Daily focus generated successfully",
      task_analyzed: tasks.length,
      data: focus,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Generating Daily Focus Please Try Again" });
  }
};

export const breakdownTask = async (req: Request, res: Response) => {
  const task_id = Number(req.params.id);
  const user_id = Number(req.user?.id);

  if (!task_id) {
    return res.status(400).json({
      message: "Please provide task id",
    });
  }

  if (!user_id) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const task = await getTaskBreakDown(task_id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
        data: null,
      });
    }

    const subtask = await generateTaskBreakDown(task.title, task.description);

    if (subtask.length === 0) {
      return res.status(400).json({
        message: "This task is already small enough, no breakdown needed",
        data: [],
      });
    }
    return res.status(200).json({
      message: "Task breakdown generated successfully",
      data: subtask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error While Generating Task Breakdown Please Try Again",
    });
  }
};

export const saveTaskBreakdown = async (req: Request, res: Response) => {
  const task_id = Number(req.params.id);
  const user_id = Number(req.user?.id);

  const { subtasks } = req.body;

  if (!task_id) {
    return res.status(400).json({
      message: "Please provide task id",
    });
  }

  if (!user_id) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (!subtasks || subtasks.length === 0 || !Array.isArray(subtasks)) {
    return res.status(400).json({
      message: "Please provide subtasks to save",
    });
  }

  try {
    const parent = await getTaskBreakDown(task_id);
    if (!parent) {
      return res.status(404).json({
        message: "Parent Task not found",
      });
    }

    const saved = await saveSubTasks(subtasks, task_id, user_id);

    return res.status(201).json({
      message: `${saved.length} subtasks created successfully`,
      data: saved,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Saving Subtask Please Try Again" });
  }
};

export const getRiskReport = async (req: Request, res: Response) => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const tasks = await getActiveTasksById(user_id);
    const riskReport = await generateRiskReport(tasks);

    return res.status(200).json({
      message: "Risk report generated successfully",
      task_analyzed: tasks.length,
      data: riskReport,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Generating Risk Report Please Try Again" });
  }
};
