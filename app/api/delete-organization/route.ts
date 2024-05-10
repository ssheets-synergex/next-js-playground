import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('orgId');  

  if (!id ) {
    throw new Error('The organization`s ID is required.');
  }

  try {
    const { rowCount } = await sql`
      DELETE FROM organizations
      WHERE id = ${id}
   `;
   
   if (rowCount === 0) {
    return NextResponse.json({ message: `No organization found with ID ${id}` }, { status: 404 });
  } else {
    return NextResponse.json({ message: `Organization with ID ${id} deleted successfully` }, { status: 200 });
  }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  };
}