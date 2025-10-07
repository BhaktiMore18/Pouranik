import express from "express";
import { signUp, logIn, getUserDetails, refreshToken, requestPasswordReset,  resetPassword } from "../Controllers/user.controller.js";
import authenticateToken from "../Middlewares/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);

router.get("/api/v1/user/:id/details", authenticateToken, getUserDetails);
router.post("/api/v1/user/:id/refreshToken", authenticateToken, refreshToken)

// ✅ New routes for Forgot Password flow
router.post("/auth/forgot-password", requestPasswordReset); // request reset link
router.post("/auth/reset-password", resetPassword);         // submit new password

export default router;
