import pool from "../config/db.js";

export const deductBalance = async (userId, amount) => {
  await pool.execute("UPDATE users SET balance = balance - ? WHERE id = ?", [amount, userId]);
};

export const createTransaction = async (userId, type, amount, description) => {
  await pool.execute(
    "INSERT INTO transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)",
    [userId, type, amount, description]
  );
};

export const getUserBalance = async (userId) => {
  const [rows] = await pool.execute("SELECT balance FROM users WHERE id = ?", [userId]);
  return rows[0].balance;
};

export const lastInvoice = async () => {
  const [rows] = await pool.execute("SELECT invoice_number FROM transactions ORDER BY created_at DESC LIMIT 1");
  return rows[0] ? rows[0].invoice_number : null;
}