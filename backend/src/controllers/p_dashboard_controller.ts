import { Request, Response } from "express";
import {
  getDashboardStats,
  getDashboardTrends,
  getRecentTasks,
} from "@/models/p_dashboard_model.js";

export const fetchDashboardStats = async (req: Request, res: Response) => {
  if (!req?.user?.id) return res.status(401).json({ message: "Unauthorized" });

  const userId = Number(req.user.id);

  try {
    const stats = await getDashboardStats(userId);
    return res
      .status(200)
      .json({ message: "Dashboard stats fetched successfully", data: stats });
  } catch (error) {
    return res.status(500).json({
      message: "Error While Fetching Dashboard Stats Please Try Again",
    });
  }
};

export const fetchDashboardTrends = async (req: Request, res: Response) => {
  if (!req?.user?.id) return res.status(401).json({ message: "Unauthorized" });

  const userId = Number(req.user.id);
  const mode = (req.query.mode as string) || "weekly";

  try {
    const trends = await getDashboardTrends(userId, mode);

    return res.status(200).json({
      message: "Dashboard Trends fetched successfully",
      data: trends,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error While Fetching Dashboard Trends Please Try Again",
    });
  }
};

export const fetchRecentTasks = async (req: Request, res: Response) => {
  if (!req?.user?.id) return res.status(401).json({ message: "Unauthorized" });

  const userId = Number(req.user.id);

  try {
    const tasks = await getRecentTasks(userId);
    return res.status(200).json({
      message: "Recent tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error While Fetching Recent Tasks Please Try Again",
    });
  }
};
