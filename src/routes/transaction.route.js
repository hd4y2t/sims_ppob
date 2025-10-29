import express from "express";
import { transact } from "../controllers/transaction.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", verifyToken, transact);

export default router;
