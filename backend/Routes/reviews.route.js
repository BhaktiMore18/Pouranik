import express from "express";
import { addReview, updateReview, deleteReview, toggleLikeReview, reportReview } from "../Controllers/review.controller.js";
import authenticateToken from "../Middlewares/auth.js";

const router = express.Router();

router.post("/api/v1/genbook/:id/review/add", authenticateToken, addReview);
router.put("/api/v1/genbook/:bid/review/:rid/update", authenticateToken, updateReview);
router.delete("/api/v1/genbook/:bid/review/:rid/delete", authenticateToken, deleteReview);
router.put("/api/v1/genbook/:bid/review/:rid/like", authenticateToken, toggleLikeReview);
router.post("/api/v1/genbook/:bid/review/:rid/report", authenticateToken, reportReview);

export default router;