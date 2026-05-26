import {
  fetchAllUsers,
  fetchUserByEmail,
  fetchUserById,
  recoverUser,
  removeUser,
  deleteUser,
} from "@/controllers/user_controller.js";
import express from "express";
import { protect } from "@/middleware/authentication.js";
import { authorize } from "@/middleware/authorization.js";

const router = express.Router();

router.get("/user", protect, authorize("admin"), fetchAllUsers);
router.get("/user/:id", protect, authorize("admin"), fetchUserById);
router.post("/user/search", protect, authorize("admin"), fetchUserByEmail);
router.post("/user/:id", protect, removeUser);
router.post("/user/recover/:id", protect, authorize("admin"), recoverUser);
router.delete("/user/delete/:id", protect, authorize("admin"), deleteUser);

export default router;
