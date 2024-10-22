import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared/";

export async function GET(): Promise<NextResponse> {
  try {
    const { rows } = await sql`
      SELECT * FROM carros_modelos`;
    return ApiHandler.ResponseToJson(rows, 200);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { nome } = await request.json();
    
    if (!nome) {
      return ApiHandler.ResponseToJson({ error: "Nome é obrigatório" }, 400);
    }

    const { rows } = await sql`
      INSERT INTO carros_modelos (nome)
      VALUES (${nome})
      RETURNING *`;

    return ApiHandler.ResponseToJson(rows[0], 201);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}

export async function PUT(request: Request): Promise<NextResponse> {
  try {
    const { id, nome } = await request.json();

    if (!id || !nome) {
      return ApiHandler.ResponseToJson({ error: "Código e nome são obrigatórios" }, 400);
    }

    const { rowCount } = await sql`
      UPDATE carros_modelos
      SET nome = ${nome}
      WHERE id = ${id}`;

    if (rowCount === 0) {
      return ApiHandler.ResponseToJson({ error: "Modelo não encontrado" }, 404);
    }

    return ApiHandler.ResponseToJson({ message: "Modelo atualizado com sucesso" }, 200);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const { id } = await request.json();

    if (!id) {
      return ApiHandler.ResponseToJson({ error: "Código é obrigatório" }, 400);
    }

    const { rowCount } = await sql`
      DELETE FROM carros_modelos
      WHERE id = ${id}`;

    if (rowCount === 0) {
      return ApiHandler.ResponseToJson({ error: "Modelo não encontrado" }, 404);
    }

    return ApiHandler.ResponseToJson({ message: "Modelo removido com sucesso" }, 200);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}
