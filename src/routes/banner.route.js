import express from "express";
import { getDataBanner } from "../controllers/banner.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", verifyToken, getDataBanner);

export default router;
