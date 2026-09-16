import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendFeedbackMail = async (
  username: string,
  email: string,
  message: string,
  type: "bug" | "general" | "feature",
) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    replyTo: email,
    subject: `[Vanta Feedback] ${type.toUpperCase()} from ${username}`,
    html: `
      <h2>New Feedback Received</h2>
      <p><strong>From:</strong> ${username} (${email})</p>
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  });
};
