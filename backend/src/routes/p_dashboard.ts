import express from "express";
import { protect } from "@/middleware/authentication.js";
import {
  fetchDashboardStats,
  fetchDashboardTrends,
  fetchRecentTasks,
  fetchAtRiskTasks,
} from "@/controllers/p_dashboard_controller.js";

const router = express.Router();

router.get("/dashboard/stats", protect, fetchDashboardStats);
router.get("/dashboard/trends", protect, fetchDashboardTrends);
router.get("/dashboard/recent-tasks", protect, fetchRecentTasks);
router.get("/dashboard/risk-tasks", protect, fetchAtRiskTasks);

export default router;
