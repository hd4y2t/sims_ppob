import pool from "../config/db.js";

export class Banner {
    static async getData() {
        const [rows] = await pool.execute("SELECT * FROM banners");
        return rows;
    }
}
