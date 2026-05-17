import express from "express";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/v1", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
