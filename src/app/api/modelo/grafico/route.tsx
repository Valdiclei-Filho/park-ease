import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared/";

export async function GET(): Promise<NextResponse> {
    try{
        const { rows } = await sql`
          SELECT cm.nome AS modelo, COUNT(ca.id) AS quantidade
          FROM carros AS ca
          JOIN carros_modelos AS cm ON cm.id = ca.id_cor
          GROUP BY cm.nome;`;
        
        return ApiHandler.ResponseToJson(rows, 200);
      } catch (error) {
        return ApiHandler.ResponseToJson(error, 500);
      }
}