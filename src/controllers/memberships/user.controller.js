import { findUserByEmail, updateUserData, updateProfileImage } from "../../services/memberships/user.service.js";
import { success, error } from "../../utils/response.js";
import { mapUserProfile } from "../../helpers/helper.js";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();

export const getProfile = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return error(res, "Token tidak valid atau user tidak ditemukan", 401);
        }

        const dataUser = await findUserByEmail(user.email);

        return success(res, "Sukses", 200, mapUserProfile(dataUser));
    } catch (err) {
        console.error("Error getProfile:", err);
        return error(res, err.message, 500);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { first_name, last_name } = req.body;
        if (!first_name || !last_name) {
            return error(res, "First name and last name are required", 400);
        }

        const user = await updateUserData(req.user.id, { first_name, last_name });
        return success(res, "Sukses", 200, mapUserProfile(user));
    } catch (err) {
        return error(res, err.message, 500);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(new Error("Format Image tidak sesuai"), false);
    }
};

export const upload = multer({ storage, fileFilter });

export const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return error(res, "No file uploaded or invalid file type", 400);
        }

        const imagePath = `/uploads/${req.file.filename}`;
        const user = await updateProfileImage(req.user.id, imagePath);

        return success(res, "Profile image updated successfully", 200, mapUserProfile(user));
    } catch (err) {
        console.error("Upload error:", err);
        return error(res, err.message || "Server error", 500);
    }
};