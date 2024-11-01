import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ApiHandler } from "@/shared/";

export async function GET(): Promise<NextResponse> {
  try {
    const { rows } = await sql`
      SELECT * FROM planos as p order by p.valor asc`;
    return ApiHandler.ResponseToJson(rows, 200);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}
