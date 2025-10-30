import pool from "../config/db.js";

export class User {
    static async create(first_name, last_name, email, hashedPassword) {
        const query = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
        const [result] = await pool.execute(query,[first_name, last_name, email, hashedPassword]);
        return result.insertId;
    }

    static async findByEmail(email) {
        const query = "SELECT * FROM users WHERE email = ?";
        const [rows] = await pool.execute(query, [email]);
        return rows[0];
    }

    static async findById(id) {
        const query = "SELECT * FROM users WHERE id = ?";
        const [rows] = await pool.execute(query, [id]);
        return rows[0];
    }

    static async incrementBalance(id, amount) {
        const query = "UPDATE users SET balance = balance + ? WHERE id = ?";
        await pool.execute(query, [amount, id]);
    }

    static async decrementBalance(id, amount) {
        const query = "UPDATE users SET balance = balance - ? WHERE id = ?";
        await pool.execute(query, [amount, id]);
    }

    static async updateDataUser(id, first_name, last_name) {
        const query = "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?";
        await pool.execute(query, [first_name, last_name, id]);
    }

    static async updateProfileImage(userId, filePath) {
        const query = "UPDATE users SET profile_image = ? WHERE id = ?";
        await pool.execute(query, [filePath, userId]);
    }

    static async getBalance(id) {
        const query = "SELECT balance FROM users WHERE id = ?";
        const [rows] = await pool.execute(query, [id]);
        return rows[0].balance;
    }
}
