import { createTransaction, getUserBalance, getTransaction, getTransactionById } from "../../services/transactions/transaction.service.js";
import { error, success } from "../../utils/response.js";
import { findService } from "../../services/informations/service.service.js";
import { decrementBalance } from "../../services/memberships/user.service.js";
import { mapTransaction, mapTransactionHistory } from "../../helpers/helper.js";

export const transaction = async (req, res) => {
    try {
        const { service_code, description } = req.body;
        const service = await findService(service_code);

        if (!service)
            return error(res, "Service ataus Layanan tidak ditemukan", 402);
        const amount = service.service_tariff;

        const balance = await getUserBalance(req.user.id);
        if (balance < amount)
            return error(res, "Insufficient balance", 400);


        await decrementBalance(req.user.id, amount);
        const transaction = await createTransaction(req.user.id, "PAYMENT", amount, description, service.service_code);

        const result = await getTransactionById(transaction);

        return success(res, "Transaction success", 200, mapTransaction(result));
    } catch (err) {
        return error(res, err.message, 500);
    }
};

export const getTransactionHistory = async (req, res) => {
    try {
        const { limit, offset } = req.body;
        const transactions = await getTransaction(req.user.id, limit, offset);
        return success(res, "Get History Berhasil", 200, {
            offset: offset ? offset : 0,
            limit: limit ? limit : transactions.length,
            records: transactions.map(mapTransactionHistory)
        });
    } catch (err) {
        return error(res, err.message, 500);
    }
};
