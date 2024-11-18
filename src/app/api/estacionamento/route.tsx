import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared";

export async function GET(): Promise<NextResponse> {
  try {
    const { rows } = await sql`
      SELECT cl.id, cl.nome as Nome_Cliente, cl.email as Email, cl.cpf as CPF, 
      pl.nome as Plano, pl.valor as Valor_Plano, pl.horas_maximas as Horas_Maximas,
      mo.nome as Modelo, co.nome as Cor, ca.placa as Placa FROM clientes cl
      INNER JOIN planos pl ON  cl.id_plano = pl.id
      INNER JOIN carros ca ON cl.id_carro = ca.id
      INNER JOIN carros_modelos mo ON ca.id_modelo = mo.id
      INNER JOIN cores co ON ca.id_cor = co.id;`;
    return ApiHandler.ResponseToJson(rows, 200);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const id_cliente = searchParams.get("id_cliente");
  const horario_entrada = searchParams.get("horario_entrada");

  const movimentacao = {
    id_cliente,
    horario_entrada: horario_entrada,
    horario_saída: null,
    estacionado: true,
  };

  try {
    const { rows } = await sql`
    INSERT INTO clientes_movimentacoes_veiculos (id_cliente, horario_entrada, horario_saida, estacionado) VALUES (${movimentacao.id_cliente}, ${movimentacao.horario_entrada}, ${movimentacao.horario_saída}, ${movimentacao.estacionado});`;
    return ApiHandler.ResponseToJson(rows, 201);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const id_cliente = searchParams.get("id_cliente");
  const horario_saida = searchParams.get("horario_saida");

  const movimentacao = {
    id_cliente,
    horario_saida: horario_saida,
    estacionado: false,
  };

  try {
    const { rows } = await sql`
    update clientes_movimentacoes_veiculos set horario_saida = ${movimentacao.horario_saida}, estacionado = ${movimentacao.estacionado} where id_cliente = ${movimentacao.id_cliente};`;
    return ApiHandler.ResponseToJson(rows, 201);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}
