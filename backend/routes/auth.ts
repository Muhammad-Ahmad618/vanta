import express from "express";

const router = express.Router();

router.post("/auth/register");
router.post("/auth/login");

export default router;
