import express from "express";
import { protect } from "@/middleware/authentication.js";
import { fetchDashboardStats } from "@/controllers/p_dashboard_controller.js";

const router = express.Router();

router.get("/dashboard/stats", protect, fetchDashboardStats);

export default router;
