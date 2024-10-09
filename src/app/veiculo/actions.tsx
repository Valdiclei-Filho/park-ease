import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export async function getCars() {
    const { rows } = await pool.query('SELECT * FROM carros');
    return rows;
}
