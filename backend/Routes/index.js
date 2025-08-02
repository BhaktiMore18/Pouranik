import { Router } from "express";
import userRouter from "./user.route.js";
import bookRouter from "./books.route.js";
import genBookRouter from "./genbook.route.js"
import reviewRouter from "./reviews.route.js";

const router = Router();

router.use("/", userRouter);
router.use("/", bookRouter);
router.use("/", genBookRouter);
router.use("/", reviewRouter);

export default router;