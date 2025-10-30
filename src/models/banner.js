import pool from "../config/db.js";

export class Banner {
    static async getData() {
        const query = "SELECT * FROM banners";
        const [rows] = await pool.execute(query);
        return rows;
    }
}
