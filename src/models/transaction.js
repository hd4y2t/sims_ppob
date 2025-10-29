import pool from "../config/db.js";

export class Transaction {
  static async create(userId, type, amount, description) {
    const [result] = await pool.execute(
      "INSERT INTO transactions (user_id, type, amount, description) VALUES (?, ?, ?, ?)",
      [userId, type, amount, description]
    );
    return result.insertId;
  }

  static async findByUser(userId) {
    const [rows] = await pool.execute(
      "SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
    return rows;
  }
}
