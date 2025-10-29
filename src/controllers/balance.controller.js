import { success, error } from "../utils/response.js";
import { getUserBalance } from "../services/balance.service.js";

export const getBalance = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return error(res, "Token tidak tidak valid atau kadaluwarsa", 408);
        }

        const data = await getUserBalance(user.id);
        return success(res, "Get Balance Berhasil", 200, { balance: parseFloat(data.balance) });
    } catch (err) {
        return error(res, err.message, 500);
    }
};