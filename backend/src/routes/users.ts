import { fetchAllUsers, fetchUserByEmail, fetchUserById, removeUser, updateUserPassword } from "@/controllers/user_controller.js";
import express from "express";


const router = express.Router();

router.get("/user", fetchAllUsers);
router.get("/user/:id", fetchUserById);
router.delete("/user/:id", removeUser);
router.post("/user/search", fetchUserByEmail);


export default router;