import pool from "../config/db.js";
import { generateInvoice } from "../helpers/helper.js";

export class Transaction {
  static async create(userId, type, amount, description, service_code = null) {

    const invoiceNumber = generateInvoice(await this.lastInvoice());

    const query = "INSERT INTO transactions (user_id, invoice_number, transaction_type, total_amount, description, service_code) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await pool.execute(query, [userId, invoiceNumber, type, amount, description, service_code]);
    return result.insertId;
  }

  static async findById(id) {
    const query = "SELECT a.*, b.service_name FROM transactions a, services b WHERE a.id = ? AND a.service_code = b.service_code";
    const [rows] = await pool.execute(query, [id]);
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