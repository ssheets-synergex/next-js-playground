import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    try {
        const organizations = await sql`SELECT * FROM organizations;`;
        return NextResponse.json({ organizations }, { status: 200 });
    } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
    }
};