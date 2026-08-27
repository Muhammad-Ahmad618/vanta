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
router.get("/user/search", protect, authorize("admin"), fetchUserByEmail);
router.patch("/user/:id", protect, authorize("admin"), removeUser);
router.post("/user/recover/:id", protect, authorize("admin"), recoverUser);
router.delete("/user/delete/:id", protect, authorize("admin"), deleteUser);

export default router;
