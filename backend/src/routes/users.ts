import {
  fetchAllUsers,
  fetchUserByEmail,
  fetchCurrentUser,
  recoverUser,
  removeUser,
  deleteUser,
  UpdateUserProfile,
  updateUserPassword,
  fetchUserPreferences,
  updateUserPreferences,
  deleteMyAccount,
} from "@/controllers/user_controller.js";
import express from "express";
import { protect } from "@/middleware/authentication.js";
import { authorize } from "@/middleware/authorization.js";
import { upload } from "@/config/multer.js";

const router = express.Router();

router.get("/user/search", protect, authorize("admin"), fetchUserByEmail);

// user setting routes

router.get("/user/me", protect, fetchCurrentUser);
router.get("/user/me/preferences", protect, fetchUserPreferences);
router.patch("/user/me", protect, upload.single("avatar"), UpdateUserProfile);
router.patch("/user/me/password", protect, updateUserPassword);
router.patch("/user/me/preferences", protect, updateUserPreferences);
router.delete("/user/me", protect, deleteMyAccount);

// admin specific routes
router.get("/user", protect, authorize("admin"), fetchAllUsers);
router.get("/user/:id", protect, authorize("admin"), fetchCurrentUser);
router.delete("/user/:id", protect, authorize("admin"), removeUser);
router.post("/user/recover/:id", protect, authorize("admin"), recoverUser);
router.delete("/user/delete/:id", protect, authorize("admin"), deleteUser);

export default router;
