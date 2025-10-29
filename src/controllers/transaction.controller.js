import pool from "../config/db.js";
import { deductBalance, createTransaction, getUserBalance } from "../services/transaction.service.js";
import { error, success } from "../utils/response.js";
import { findService } from "../services/service.service.js";

export const transact = async (req, res) => {
    try {

        const { service_code } = req.body;

        const service = await findService(service_code);
        if (!service)
            return error(res, "Service ataus Layanan tidak ditemukan", 402);
        const amount = service.service_tariff;

        const balance = await getUserBalance(req.user.id);
        if (balance < amount)
            return error(res, "Insufficient balance", 400);


        await deductBalance(req.user.id, amount);
        await createTransaction(req.user.id, service.id, amount, service.service_name);

        return success(res, "Transaction success", 200, );

    } catch (err) {
        return error(res, err.message, 500);
    }
};