import pool from "../config/db.js";

export class Topup {
    static async create(userId, amount) {
        const query = "INSERT INTO topups (user_id, amount) VALUES (?, ?)";
        const [result] = await pool.execute(query, [userId, amount]);
        return result.insertId;
    }

    static async findByUser(userId) {
        const query = "SELECT * FROM topups WHERE user_id = ? ORDER BY created_at DESC";
        const [rows] = await pool.execute(query, [userId]);
        return rows;
    }
}
