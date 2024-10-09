import {ResponsiveAppBar} from '../components/_ui/Header/index'
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export default function Home() {
  return (
    <div className="">
      <ResponsiveAppBar></ResponsiveAppBar>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
      </main>
    </div>
  );
}
 
export async function GET() {
 
  const pets = await sql`SELECT * FROM carros;`;
  return NextResponse.json({ pets }, { status: 200 });
}