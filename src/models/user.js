import pool from "../config/db.js";

export class User {
    static async create(first_name, last_name, email, hashedPassword) {

        const [result] = await pool.execute(
            "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
            [first_name, last_name, email, hashedPassword]
        );
        return result.insertId;
    }

    static async findByEmail(email) {
        const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
        return rows[0];
    }

    static async incrementBalance(id, amount) {
        await pool.execute("UPDATE users SET balance = balance + ? WHERE id = ?", [amount, id]);
    }

    static async decrementBalance(id, amount) {
        await pool.execute("UPDATE users SET balance = balance - ? WHERE id = ?", [amount, id]);
    }

    static async updateDataUser(id, first_name, last_name) {
        await pool.execute("UPDATE users SET first_name = ?, last_name = ? WHERE id = ?", [first_name, last_name, id]);
    }

    static async updateProfileImage(userId, filePath) {
        await pool.execute("UPDATE users SET profile_image = ? WHERE id = ?", [
            filePath,
            userId,
        ]);
    }

    static async getBalance(id) {
        const [rows] = await pool.execute("SELECT balance FROM users WHERE id = ?", [id]);
        return rows[0].balance;
    }
}
