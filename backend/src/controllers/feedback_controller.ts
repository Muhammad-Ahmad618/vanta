import { Request, Response } from "express";
import { sendFeedbackMail } from "@/services/feedback_service.js";

export const sendFeedback = async (req: Request, res: Response) => {
  const user_id = req.user?.id;
  const { type, message } = req.body;

  if (!user_id) {
    return res.status(401).json({ message: "unauthorized" });
  }

  if (!message || message.trim() === "") {
    return res
      .status(401)
      .json({ success: false, message: "feedback cannot be empty" });
  }

  const valid_type = ["general", "bug", "feature"];
  const feedbackType = valid_type.includes(type) ? type : "general";

  try {
    await sendFeedbackMail(
      req.user?.username!,
      req.user?.email!,
      message,
      feedbackType,
    );

    return res
      .status(200)
      .json({ success: true, message: "Feedback sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
