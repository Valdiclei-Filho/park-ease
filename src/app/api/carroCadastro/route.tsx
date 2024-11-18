import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const placa = searchParams.get("placa");
  const dataCadastro = searchParams.get("dataCadastro");
  const id_cor = searchParams.get("id_cor");
  const id_modelo = searchParams.get("id_modelo");

  const carro = {
    placa,
    data_cadastro: dataCadastro,
    id_cor,
    id_modelo,
  };

  try {
    const data_cadastro = new Date().toISOString();
    const { rows } = await sql`
    INSERT INTO carros (placa, data_cadastro, id_cor, id_modelo) VALUES (${carro.placa}, ${data_cadastro}, ${carro.id_cor}, ${carro.id_modelo});`;
    return ApiHandler.ResponseToJson(rows, 201);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}
