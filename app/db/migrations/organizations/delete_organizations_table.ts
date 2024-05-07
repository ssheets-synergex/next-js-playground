import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export const  deleteOrgsTable = async() => {
  try {
    await sql`
        DROP TABLE IF EXISTS organizations;
   `;
   
    return NextResponse.json({ message: `Organizations table deleted successfully` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  };
}