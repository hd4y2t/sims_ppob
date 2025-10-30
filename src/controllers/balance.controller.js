import { success, error } from "../utils/response.js";
import { getBalance as balanceUser } from "../services/user.service.js";

export const getBalance = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return error(res, "Token tidak tidak valid atau kadaluwarsa", 408);
        }

        const balance = await balanceUser(user.id);
        return success(res, "Get Balance Berhasil", 200, { balance: parseFloat(balance) });
    } catch (err) {
        return error(res, err.message, 500);
    }
};