import pool from "../config/db.js";

export class Service {
    static async getData() {
        const [rows] = await pool.execute("SELECT * FROM services");
        return rows;
    }

    static async findByCode(serviceCode) {
        const [rows] = await pool.execute("SELECT * FROM services WHERE service_code = ?", [serviceCode]);
        return rows[0];
    }
}
