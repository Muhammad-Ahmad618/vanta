import {
  fetchAllUsers,
  fetchUserByEmail,
  fetchUserById,
  removeUser,
  updateUserPassword,
} from "@/controllers/user_controller.js";
import express from "express";
import { protect } from "@/middleware/authentication.js";
import { authorize } from "@/middleware/authorization.js";

const router = express.Router();

router.get("/user", protect, authorize("admin"), fetchAllUsers);
router.get("/user/:id", protect, authorize("admin"), fetchUserById);
router.delete("/user/:id", protect, authorize("admin"), removeUser);
router.post("/user/search", protect, authorize("admin"), fetchUserByEmail);

export default router;
