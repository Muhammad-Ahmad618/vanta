import {
  createTaskComment,
  hardDeleteTaskComment,
  getAllComments,
  updateTaskComment,
  getCommentById,
  softDeleteTaskComment,
  restoreTaskComment,
} from "@/models/tasks_comments_model.js";
import { getTaskById } from "@/models/tasks_model.js";
import { Request, Response } from "express";

export const fetchAllCommentsOfATask = async (req: Request, res: Response) => {
  const task_idNum = Number(req.params.id);
  const user_id = Number(req.user?.id);

  if (isNaN(task_idNum)) {
    return res
      .status(400)
      .json({ message: "Invalid Task ID Please Try Again." });
  }
  try {
    const task = await getTaskById(task_idNum);

    if (!task || task.deleted_at !== null) {
      return res.status(404).json({ message: "Task Not Found !" });
    }

    if (
      req.user?.role !== "admin" ||
      (task.user_id !== user_id && task.assigned_to !== user_id)
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const result = await getAllComments(task_idNum);

    if (result.length === 0) {
      return res.status(200).json({ message: "No Comments Found" });
    }

    return res
      .status(200)
      .json({ message: "Comments Fetched Successfully", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Fetching Comments. Please Try Again" });
  }
};

export const AddComment = async (req: Request, res: Response) => {
  const { task_id } = req.params;
  const { content } = req.body;
  const user_id = req.user?.id;

  const task_idNum = Number(task_id);
  const user_idNum = Number(user_id);

  if (isNaN(task_idNum) || isNaN(user_idNum)) {
    return res
      .status(400)
      .json({ message: "Invalid Task ID or User ID Please Try Again." });
  }

  if (content === "" || content === null || content === undefined) {
    return res
      .status(400)
      .json({ message: "Comment Cannot Be Empty Please Try Again." });
  }

  try {
    const result = await createTaskComment(task_idNum, user_idNum, content);
    return res
      .status(200)
      .json({ message: "Comment Created Successfully", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Error While Creating Comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);
  const user_id = req.user?.id;
  const user_idNum = Number(user_id);

  if (isNaN(idNum) || isNaN(user_idNum)) {
    return res
      .status(400)
      .json({ message: "Invalid Comment ID or User ID Please Try Again." });
  }
  try {
    const comment = await getCommentById(idNum);
    if (!comment || comment.deleted_at !== null) {
      return res.status(404).json({ message: "Comment Not Found" });
    }

    if (req.user?.role !== "admin" && comment.user_id !== user_idNum) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const result = await softDeleteTaskComment(idNum);
    return res
      .status(200)
      .json({ message: "Comment Deleted Successfully", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Error While Deleting Comment" });
  }
};

export const hardDeleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);

  if (isNaN(idNum)) {
    return res
      .status(400)
      .json({ message: "Invalid Comment ID Please Try Again." });
  }

  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const result = await hardDeleteTaskComment(idNum);

    if (!result) {
      return res.status(404).json({ message: "Comment Not Found" });
    }

    return res
      .status(200)
      .json({ message: "Comment Hard Deleted Successfully", data: result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While Hard Deleting Comment" });
  }
};

export const recoverComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNum = Number(id);

  if (isNaN(idNum)) {
    return res
      .status(400)
      .json({ message: "Invalid Comment ID Please Try Again." });
  }

  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const result = await restoreTaskComment(idNum);

    if (!result) {
      return res.status(404).json({ message: "Comment Not Found" });
    }

    return res
      .status(200)
      .json({ message: "Comment Restored Successfully", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Error While Restoring Comment" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  const idNum = Number(id);
  const user_id = req.user?.id;
  const user_idNum = Number(user_id);

  if (isNaN(idNum) || isNaN(user_idNum)) {
    return res
      .status(400)
      .json({ message: "Invalid Comment ID or User ID Please Try Again." });
  }
  if (content === "" || content === null || content === undefined) {
    return res
      .status(400)
      .json({ message: "Comment Cannot Be Empty Please Try Again." });
  }
  try {
    const result = await updateTaskComment(idNum, user_idNum, content);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Comment Not Found or Unauthorized" });
    }

    return res
      .status(200)
      .json({ message: "Comment Updated Successfully", data: result });
  } catch (error) {
    return res.status(500).json({ message: "Error While Updating Comment" });
  }
};
