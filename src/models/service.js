import pool from "../config/db.js";

export class Service {
    static async getData() {
        const query = "SELECT * FROM services";
        const [rows] = await pool.execute(query);
        return rows;
    }

    static async findByCode(serviceCode) {
        const query = "SELECT * FROM services WHERE service_code = ?";
        const [rows] = await pool.execute(query, [serviceCode]);
        return rows[0];
    }
}
