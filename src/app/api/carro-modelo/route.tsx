import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { ApiHandler } from "../../../shared";

export async function GET(): Promise<NextResponse> {
  try {
    const { rows } = await sql`SELECT c.*
      FROM CARROS_MODELOS c`;
    return ApiHandler.ResponseToJson(rows, 200);
  } catch (error) {
    return ApiHandler.ResponseToJson(error, 500);
  }
}
