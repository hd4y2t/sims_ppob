import express from "express";
import { topup } from "../controllers/transactions/topup.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/", verifyToken, topup);

export default router;
