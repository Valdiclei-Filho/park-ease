import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared/";

export async function GET(): Promise<NextResponse> {
    try{
        const { rows } = await sql`
          SELECT co.nome AS cor, COUNT(ca.id) AS quantidade
          FROM carros AS ca
          JOIN cores AS co ON co.id = ca.id_cor
          GROUP BY co.nome;`;
        
        return ApiHandler.ResponseToJson(rows, 200);
      } catch (error) {
        return ApiHandler.ResponseToJson(error, 500);
      }
}