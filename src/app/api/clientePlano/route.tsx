import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const nome = searchParams.get("nome");
  const email = searchParams.get("email");
  const cpf = searchParams.get("cpf");
  const telefone = searchParams.get("telefone");
  const dataNascimento = searchParams.get("dataNascimento");
  const id_plano = searchParams.get("id_plano");
  const id_carro = searchParams.get("id_carro");

  const cliente = {
    nome,
    email,
    cpf,
    telefone,
    data_nascimento: dataNascimento,
    id_plano,
    id_carro,
  };

  try {
    const data_cadastro = new Date().toISOString();
    const { rows } = await sql`
    INSERT INTO clientes (nome, email, cpf, telefone, data_nascimento, id_plano, id_carro, data_cadastro) VALUES (${cliente.nome}, ${cliente.email}, ${cliente.cpf}, ${cliente.telefone}, ${cliente.data_nascimento}, ${cliente.id_plano}, ${cliente.id_carro}, ${data_cadastro});`;
    return ApiHandler.ResponseToJson(rows, 201);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}
