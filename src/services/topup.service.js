import pool from "../config/db.js";

export const addBalance = async (userId, amount) => {
  await pool.execute("UPDATE users SET balance = balance + ? WHERE id = ?", [amount, userId]);
  await pool.execute("INSERT INTO topups (user_id, amount) VALUES (?, ?)", [userId, amount]);
};
