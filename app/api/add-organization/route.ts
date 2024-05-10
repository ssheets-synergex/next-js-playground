import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

/**
 * example search params: ?name=BestOrg&yearFounded=2008&category=Elite&contactFirstName=Clide&contactLastName=Best&contactPhone=000-000-0000&contactEmail=clide.best@email.com&websiteURL=https://best.com&facebookURL=https://facebook.com&instagramURL=https://instagram.com&about=We're only the best organization
 */
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const yearFounded = searchParams.get('yearFounded');
  const category = searchParams.get('category');
  const contactFirstName = searchParams.get('contactFirstName');
  const contactLastName = searchParams.get('contactLastName');
  const contactPhone = searchParams.get('contactPhone');
  const contactEmail = searchParams.get('contactEmail');
  const websiteURL = searchParams.get('websiteURL');
  const facebookURL = searchParams.get('facebookURL');
  const instagramURL = searchParams.get('instagramURL');
  const about = searchParams.get('about');
  const logo = searchParams.get('logo');

  if (!name || !yearFounded || !category || !contactFirstName || !contactLastName || !contactPhone || ! websiteURL || !about) {
    throw new Error('The organization`s name, year founded, category, webiste URL, and about sections and the organization`s contact`s first and last name, and phone number are required.');
  } 

  try {
    await sql`
    INSERT INTO organizations (id, name, yearFounded, category, contactFirstName, contactLastName, contactEmail, contactPhone, websiteURL, facebookURL, instagramURL, about, logo)
        VALUES(gen_random_uuid(), ${name}, ${yearFounded}, ${category}, ${contactFirstName}, ${contactLastName}, ${contactEmail}, ${contactPhone}, ${websiteURL}, ${facebookURL}, ${instagramURL}, ${about}, ${logo});
    `;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const organizations = await sql`SELECT * FROM organizations;`;
  return NextResponse.json({ organizations }, { status: 200 });
}