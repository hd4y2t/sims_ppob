import express from "express";
import { getDataService } from "../controllers/service.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", verifyToken, getDataService);

export default router;
