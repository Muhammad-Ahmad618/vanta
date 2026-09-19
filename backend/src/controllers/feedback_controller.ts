import { Request, Response } from "express";
import { transporter } from "@/services/transporter.js";

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

  transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP verification failed:", error);
    } else {
      console.log("SMTP server is ready:", success);
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      replyTo: req.user?.email,
      subject: `[Vanta Feedback] ${feedbackType.toUpperCase()} from ${req.user?.username}`,
      html: `
         <h2>New Feedback Received</h2>
         <p><strong>From:</strong> ${req.user?.username} (${req.user?.email})</p>
         <p><strong>Type:</strong> ${feedbackType}</p>
         <p><strong>Message:</strong></p>
         <p>${message}</p>
       `,
    });

    return res
      .status(200)
      .json({ success: true, message: "Feedback sent successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
