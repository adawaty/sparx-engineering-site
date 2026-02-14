// Vercel Serverless Function to handle contact form submissions
export const config = { runtime: 'edge' };

import { neon } from '@neondatabase/serverless';

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  // Check for DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error('Missing DATABASE_URL environment variable');
    return new Response(JSON.stringify({ 
      error: 'Server Configuration Error: DATABASE_URL is missing.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { name, email, phone, projectType, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sql = neon(process.env.DATABASE_URL);

    // Insert into Neon DB
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT,
        projectType TEXT,
        message TEXT,
        status TEXT DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await sql`
      INSERT INTO contact_messages (name, email, phone, projectType, message, status)
      VALUES (${name}, ${email}, ${phone}, ${projectType}, ${message}, 'new');
    `;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Database error:', error);
    
    // Return detailed error for debugging (remove in production if sensitive)
    const errorMessage = error.message || 'Internal Server Error';
    
    return new Response(JSON.stringify({ 
      error: `Database Error: ${errorMessage}` 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
