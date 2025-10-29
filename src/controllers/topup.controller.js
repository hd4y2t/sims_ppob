
import { success, error } from "../utils/response.js";
import { addBalance } from "../services/topup.service.js";
import { getUserBalance } from "../services/balance.service.js";


export const topup = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return error(res, "Token tidak tidak valid atau kadaluwarsa", 408);
        }

        await addBalance(user.id, req.body.top_up_amount);
        const getBalance = await getUserBalance(user.id);
        return success(res, "Top Up Balance Berhasil", 200, { balance: parseFloat(getBalance.balance) });
    } catch (err) {
        return error(res, err.message, 500);
    }
};
