import { sendFeedback } from "@/controllers/feedback_controller.js";
import { protect } from "@/middleware/authentication.js";
import express from "express";

const router = express.Router();

router.post("/feedback", protect, sendFeedback);

export default router;
