

import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export async function getCars() {
    const query = `
        SELECT c.*, cor.nome AS cor_nome, modelo.nome AS modelo_nome
        FROM carros c
        LEFT JOIN cores cor ON c.id_cor = cor.id
        LEFT JOIN carros_modelos modelo ON c.id_modelo = modelo.id;
    `;
    const { rows } = await pool.query(query);
    return rows;
}

export async function addCar(placa: string, id_cor: string, id_modelo: string, data_cadastro: string) {
    const query = `
        INSERT INTO carros (placa, id_cor, id_modelo, data_cadastro)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [placa, id_cor, id_modelo, data_cadastro];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function updateCar(id: number, placa: string, id_cor: string, id_modelo: string, data_cadastro: string) {
    const query = `
        UPDATE carros
        SET placa = $2, id_cor = $3, id_modelo = $4, data_cadastro = $5
        WHERE id = $1
        RETURNING *;
    `;
    const values = [placa, id_cor, id_modelo, data_cadastro, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export async function deleteCar(id: number) {
    const query = `
        DELETE FROM carros
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

