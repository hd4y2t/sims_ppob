import pool from "../config/db.js";
import { generateInvoice } from "../helpers/helper.js";

export class Transaction {
  static async create(userId, type, amount, description, service_code = null, service_name = null) {

    const invoiceNumber = generateInvoice(await this.lastInvoice());

    const [result] = await pool.execute(
      "INSERT INTO transactions (user_id, invoice_number, transaction_type, total_amount, description, service_code, service_name) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, invoiceNumber, type, amount, description, service_code, service_name]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await pool.execute("SELECT * FROM transactions WHERE id = ?", [id]);
    return rows[0];
  }

  static async findByUser(userId, limit = 0, offset = 0) {
    let query = `SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;

    if (limit > 0) {
      query += ` LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}`;
    }

    const [rows] = await pool.execute(query);
    return rows;
  }

  static async lastInvoice() {
    const [rows] = await pool.execute(`
      SELECT COUNT(id) AS count 
      FROM transactions
    `);

    return rows[0]?.count || 0;
  }
}