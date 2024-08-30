import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const result =
            await sql`CREATE TABLE IF NOT EXISTS customers (
                id SERIAL PRIMARY KEY,
                full_name VARCHAR(255) NOT NULL,
                address TEXT NOT NULL,
                mobile_phone VARCHAR(20) NOT NULL
            );`;
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}