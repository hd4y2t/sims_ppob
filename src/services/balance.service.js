import pool from "../config/db.js";

export const getUserBalance = async (userId) => {
  const [rows] = await pool.execute("SELECT balance FROM users WHERE id = ?", [userId]);
  return rows[0];
};
