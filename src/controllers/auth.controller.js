import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { registerUser, findUserByEmail } from "../services/auth.service.js";
import { success, error } from "../utils/response.js";
import { isValidEmail } from "../helpers/helper.js";
import bcrypt from "bcrypt";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        if (!isValidEmail(email)) return error(res, "Parameter email tidak sesuai format", 402);
        if (password.length < 8) return error(res, "Password minimal 8 karakter", 403);

        await registerUser(first_name, last_name, email, password);
        return success(res, "Registrasi berhasil silahkan login");
    } catch (err) {
        return error(res, err.message, 500);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!isValidEmail(email)) return error(res, "Parameter email tidak sesuai format", 402);
        if (password.length < 8) return error(res, "Password minimal 8 karakter", 403);


        const user = await findUserByEmail(email);
        if (!user) return error(res, "Username atau password salah", 103);

        const match = await bcrypt.compare(password, user.password);
        if (!match) return error(res, "Username atau password salah", 103);

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "12h",
        });

        return success(res, "Login Sukses", 200, { token });
    } catch (err) {
        return error(res, err.message, 500);
    }
};
