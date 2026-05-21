import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import taskCommentRoutes from "./routes/task_comments.js";
import workspaceRoutes from "./routes/workspace.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", taskRoutes);
app.use("/api/v1", taskCommentRoutes);
app.use("/api/v1", workspaceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
