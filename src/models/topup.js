import pool from "../config/db.js";

export class Topup {
    static async create(userId, amount) {
        const [result] = await pool.execute(
            "INSERT INTO topups (user_id, amount) VALUES (?, ?)",
            [userId, amount]
        );
        return result.insertId;
    }

    static async findByUser(userId) {
        const [rows] = await pool.execute(
            "SELECT * FROM topups WHERE user_id = ? ORDER BY created_at DESC",
            [userId]
        );
        return rows;
    }
}
