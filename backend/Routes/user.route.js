import express from "express";
import { signUp, logIn, getUserDetails } from "../Controllers/user.controller.js";
import authenticateToken from "../Middlewares/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/api/v1/user/:id/details", authenticateToken, getUserDetails);

export default router;