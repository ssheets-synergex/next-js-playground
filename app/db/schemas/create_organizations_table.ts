import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

 
export const createTable = async() => {
  try {
    const result: any = await sql`
      CREATE TABLE organizations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        year_founded INTEGER,
        category INTEGER,
        contact_first_name VARCHAR(255),
        contact_last_name VARCHAR(255),
        contact_email VARCHAR(255),
        contact_phone VARCHAR(20),
        website_url VARCHAR(255),
        facebook_url VARCHAR(255),
        instagram_url VARCHAR(255),
        about TEXT,
        logo TEXT
      );`;

    return NextResponse.json({ message: 'organizations table created successfully', result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Unable to create organizations table', error }, { status: 500 });
  }
}