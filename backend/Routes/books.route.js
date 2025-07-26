import express from "express";
import { addBook, libraryBooks, updateLibBookDetails, deleteLibBook, bookSearch, modalClose } from "../Controllers/book.controller.js";
import authenticateToken from "../Middlewares/auth.js";

const router = express.Router();

router.post("/api/v1/book/add", authenticateToken, addBook);
router.get("/api/v1/library", authenticateToken, libraryBooks);
router.put("/api/v1/lib/:uid/book/:bid/update", updateLibBookDetails);
router.delete("/api/v1/lib/:uid/book/:bid/delete", authenticateToken, deleteLibBook);
router.post("/api/v1/book/search", authenticateToken, bookSearch);
router.post("/api/v1/modal/close", authenticateToken, modalClose); // Dummy endpoint to handle modal close requests

export default router;