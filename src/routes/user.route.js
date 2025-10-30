import express from "express";
import { getProfile, updateProfile, upload, uploadProfileImage } from "../controllers/memberships/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", verifyToken, getProfile);
router.put("/update", verifyToken, updateProfile);
router.put("/image", verifyToken, upload.single("file"), uploadProfileImage);

export default router;
