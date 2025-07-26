import { Router } from "express";
import userRouter from "./user.route.js";
import bookRouter from "./books.route.js";

const router = Router();

router.use("/", userRouter);
router.use("/", bookRouter);

export default router;