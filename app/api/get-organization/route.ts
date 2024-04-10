import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('orgId');

  if (!id) {
    throw new Error('The organization`s ID is required.');
  } 

  try {
    const { rows } = await sql`
        SELECT * FROM organizations WHERE id = ${id}
    `;
    if (rows.length === 0) {
        return NextResponse.json({ error: `Organization with ID ${id} not found.`}, { status: 500 });
    } else {
        return NextResponse.json({ organization: rows[0] } , { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}