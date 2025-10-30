import pool from "../config/db.js";
import { Transaction } from "../models/transaction.js";

export const createTransaction = async (userId, type, amount, description = null, service_code = null, service_name = null) => {
  const transaction = await Transaction.create(userId, type, amount, description, service_code, service_name);
  return transaction;
};

export const getUserBalance = async (userId) => {
  const [rows] = await pool.execute("SELECT balance FROM users WHERE id = ?", [userId]);
  return rows[0].balance;
};

export const getTransaction = async (userId, limit, offset) => {
  const transactions = await Transaction.findByUser(userId, limit, offset);
  return transactions;
}

export const getTransactionById = async (id) => {
  const transaction = await Transaction.findById(id);
  return transaction; 
}