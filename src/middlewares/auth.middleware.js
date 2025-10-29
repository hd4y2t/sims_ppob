import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "../utils/response.js";
dotenv.config();

export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return error(res, "Token required", 401);

    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return error(res, "Token tidak tidak valid atau kadaluwarsa", 408);
    }
};