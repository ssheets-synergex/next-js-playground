import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    try {
        // Create a new database connection for this request
        const db = await sql.connect();

        const organizations = await db.query(`SELECT * FROM organizations;`);
        
        // Release the client back to the pool
        db.release();

        return NextResponse.json({ organizations }, { status: 200 });
    } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
    }
};