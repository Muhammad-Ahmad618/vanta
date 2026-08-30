import { Request, Response } from "express";
import { getDashboardStats } from "@/models/p_dashboard_model.js";

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
