import express from "express";
import { getBalance } from "../controllers/memberships/balance.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", verifyToken, getBalance);

export default router;
