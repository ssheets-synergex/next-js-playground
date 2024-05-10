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

// import { pool } from 'your-database-connection';

// export default async function handler(req, res) {
//   const { nameVar } = req.query;
//   let query = 'SELECT * FROM organizations';
//   const params = [];

//   if (nameVar) {
//     query += ' WHERE name = nameVar';
//     params.push(name);
//   }

//   try {
//     const { rows } = await pool.query(query, params);
//     res.status(200).json(rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// import axios from 'axios';

// axios.get('/api/organizations', {
//   params: {
//     nameVar: 'Acme Inc.'
//   }
// })
//   .then(response => {
//     // Handle the filtered organizations data
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });