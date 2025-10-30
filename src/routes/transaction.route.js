import express from "express";
import { transaction, getTransactionHistory } from "../controllers/transactions/transaction.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", verifyToken, transaction);
router.get("/history", verifyToken, getTransactionHistory);

export default router;
