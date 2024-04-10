import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`
        CREATE TABLE organizations (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            yearFounded INTEGER NOT NULL,
            category TEXT NOT NULL,
            contactFirstName TEXT NOT NULL,
            contactLastName TEXT NOT NULL,
            contactEmail TEXT NOT NULL,
            contactPhone TEXT NOT NULL,
            websiteURL TEXT NOT NULL,
            facebookURL TEXT,
            instagramURL TEXT,
            about TEXT NOT NULL,
            logo BYTEA
        );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}