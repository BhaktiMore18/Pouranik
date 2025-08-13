import express from "express";
import { signUp, logIn, getUserDetails, refreshToken } from "../Controllers/user.controller.js";
import authenticateToken from "../Middlewares/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/api/v1/user/:id/details", authenticateToken, getUserDetails);
router.post("/api/v1/user/:id/refreshToken", authenticateToken, refreshToken)

export default router;