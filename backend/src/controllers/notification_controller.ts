import { Request, Response } from "express";
import {
  getAllNotifications,
  getUnreadCount,
  updateAllNotificationsRead,
  updateNotificationRead,
} from "@/models/notification_model.js";

export const fetchAllNotifications = async (req: Request, res: Response) => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const response = await getAllNotifications(user_id);

    if (!response || response.length === 0) {
      return res.status(404).json({ message: "No notifications found" });
    }

    return res.status(200).json({
      message: "Notifications fetched successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching notifications" });
  }
};

export const fetchUnreadNotificationCount = async (
  req: Request,
  res: Response,
) => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const response = await getUnreadCount(user_id);

    if (!response || !response.length) {
      return res.status(404).json({ message: "No notifications found" });
    }
    return res.status(200).json({
      message: "Unread notification count fetched successfully",
      data: response,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching unread notifications count" });
  }
};

export const markNotificationRead = async (req: Request, res: Response) => {
  const user_id = req.user?.id;
  const { notification_id } = req.body;

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!notification_id) {
    return res.status(400).json({ message: "Notification ID is required" });
  }

  try {
    const response = await updateNotificationRead(notification_id, user_id);

    if (!response) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({
      message: "Notification marked as read successfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error marking notification read" });
  }
};

export const markAllRead = async (req: Request, res: Response) => {
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const response = await updateAllNotificationsRead(user_id);

    if (!response) {
      return res.status(200).json({ message: "No notification Found" });
    }

    return res.status(200).json({
      message: "All notifications marked as read successfully",
      data: response,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error marking all notifications read" });
  }
};
