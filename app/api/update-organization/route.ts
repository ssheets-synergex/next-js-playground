import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

/**
 * example search params: ?orgId=f0a7671e-8eb6-49bc-bcae-3d82242ecd35&name=AwesomeOrg&yearFounded=2008&category=Elite&contactFirstName=Clide&contactLastName=Best&contactPhone=000-000-0000&contactEmail=clide.best@email.com&websiteURL=https://best.com&facebookURL=https://facebook.com&instagramURL=https://instagram.com&about=We're only the best organization
 */
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('orgId');  
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

  if (!id || !name || !yearFounded || !category || !contactFirstName || !contactLastName || !contactPhone || ! websiteURL || !about) {
    throw new Error('The organization`s name, year founded, category, webiste URL, and about sections and the organization`s contact`s first and last name, and phone number are required.');
  } 

  try {
    const res = await sql`
      UPDATE organizations
      SET name = ${name},
          yearFounded = ${yearFounded},
          category = ${category},
          contactFirstName = ${contactFirstName},
          contactLastName = ${contactLastName},
          contactEmail = ${contactEmail},
          contactPhone = ${contactPhone},
          websiteURL = ${websiteURL},
          facebookURL = ${facebookURL},
          instagramURL = ${instagramURL},
          about = ${about},
          logo = ${logo}
      WHERE id = ${id}
      RETURNING id, name, yearFounded, category, contactFirstName, contactLastName, contactEmail, contactPhone, websiteURL, facebookURL, instagramURL, about, logo
   `;
    if (res.rows.length === 0) {
        return NextResponse.json({ error: `Organization with ID ${id} not found.`}, { status: 500 });
    } else {
        return NextResponse.json({ organization: res.rows[0] } , { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  };
}