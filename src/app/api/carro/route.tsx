import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ApiHandler, DateUtils } from "@/shared";

export async function GET(): Promise<NextResponse> {
  try {
    const { rows } =
      await sql`SELECT c.*, cor.nome AS cor_nome, modelo.nome AS modelo_nome
      FROM carros c
      LEFT JOIN cores cor ON c.id_cor = cor.id
      LEFT JOIN carros_modelos modelo ON c.id_modelo = modelo.id;`;
    return ApiHandler.ResponseToJson(rows, 200);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}

export async function POST(
  placa: string,
  id_cor: string,
  id_modelo: string,
): Promise<NextResponse> {
  try {
    const { rows } =
      await sql`INSERT INTO carros (placa, id_cor, id_modelo, data_cadastro)
      VALUES (${placa}, ${id_cor}, ${id_modelo}, ${DateUtils.GetCurrentDateAsString()});`;
    return ApiHandler.ResponseToJson(rows, 201);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}

export async function PUT(
  id: number,
  placa: string,
  id_cor: string,
  id_modelo: string,
): Promise<NextResponse> {
  try {
    const { rows } = await sql`UPDATE carros
      SET placa = ${placa}, id_cor = ${id_cor}, id_modelo = ${id_modelo}
      WHERE id = ${id};`;
    return ApiHandler.ResponseToJson(rows, 200);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}

export async function DELETE(id: number): Promise<NextResponse> {
  try {
    const { rows } = await sql`DELETE FROM carros
      WHERE id = ${id}`;
    return ApiHandler.ResponseToJson(rows, 200);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}
