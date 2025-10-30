
import { success, error } from "../utils/response.js";
import { createTopup } from "../services/topup.service.js";
import { getBalance, incrementBalance } from "../services/user.service.js";
import { createTransaction } from "../services/transaction.service.js";


export const topup = async (req, res) => {
    try {
        const user = req.user;
        const amount = req.body.top_up_amount;

        if (!user) {
            return error(res, "Token tidak tidak valid atau kadaluwarsa", 408);
        }

        await createTopup(user.id, amount);
        await incrementBalance(user.id, amount);
        await createTransaction(user.id, "TOPUP", amount, "Top Up Balance");

        const balance = await getBalance(user.id);
        return success(res, "Top Up Balance Berhasil", 200, { balance: parseFloat(balance) });
    } catch (err) {
        return error(res, err.message, 500);
    }
};
