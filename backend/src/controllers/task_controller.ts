import { Request, Response } from "express";
import { getErrorMessage } from "@/utils/error_handler.js";
import {
  changeTaskStatus,
  createTask,
  deleteTask,
  getAllTasks,
  getTaskByAssignedTo,
  getTaskByUserId,
  updateTask,
} from "@/models/tasks_model.js";

// Fetch All Tasks Accross DB
export const fetchAllTasks = async (req: Request, res: Response) => {
  const { limit, offset } = req.query;
  const limitNum = limit ? Number(limit) : 10;
  const offsetNum = offset ? Number(offset) : 0;

  try {
    const tasks = await getAllTasks(limitNum, offsetNum);

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found" });
    }

    return res
      .status(200)
      .json({ message: "Tasks fetched successfully", data: tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error Occured while Fetching Task Please Try Again" });
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
    return res.status(500).json({ message: "Internal Server Error Please Try Again" });
  }
};

export const AddNewTask = async (req: Request, res: Response) => {
  const { title, description, workspace_id, assigned_to, category } = req.body;
  const user_id = Number(req.user?.id);

  if (!title || !description) {
    return res.status(400).json({
      message: "Please provide title and description",
    });
  }

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const task = await createTask(
      title,
      description,
      user_id,
      workspace_id,
      assigned_to,
      category,
    );
    return res
      .status(200)
      .json({ message: "Task created successfully", data: task });
  } catch (error) {
    return res.status(500).json({ message: "Error While Creating Task Please Try Again" });
  }
};

export const updateTaskDetails = async (req: Request, res: Response) => {
  const { title, description, status, assigned_to } = req.body;
  const id = Number(req.params.id);
  const user_id = Number(req.user?.id);

  if (!title || !description || !status) {
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
    );
    return res
      .status(200)
      .json({ message: "Task updated successfully", data: task });
  } catch (error) {
    return res.status(500).json({ message: "Error While Updating Task Details Please Try Again" });
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
    return res.status(500).json({ message: "Error While Updating Task Status Please Try Again" });
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
    const task = await deleteTask(id, user_id);
    return res
      .status(200)
      .json({ message: "Task deleted successfully", data: task });
  } catch (error) {
    return res.status(500).json({ message: "Error While Deleting Task Please Try Again" });
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
    return res.status(500).json({ message: "Internal Server Error Please Try Again" });
  }
};
