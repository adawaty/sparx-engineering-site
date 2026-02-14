// Vercel Serverless Function to retrieve and update contact messages
export const config = { runtime: 'edge' };

import { neon } from '@neondatabase/serverless';

const ADMIN_SECRET = 'admin123';
const ALLOWED_STATUS = new Set(['new', 'read', 'contacted']);

export default async function handler(request: Request) {
  // Check for DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error('Missing DATABASE_URL environment variable');
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Server Configuration Error: DATABASE_URL is missing. Please add it in Vercel Settings.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');

  // Require secret for admin endpoints (GET + PATCH)
  if (secret !== ADMIN_SECRET) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Ensure table exists (first run / new DB)
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

    // Ensure existing DBs get the new column
    await sql`ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';`;

    if (request.method === 'GET') {
      const messages = await sql`
        SELECT * FROM contact_messages
        ORDER BY created_at DESC
        LIMIT 200
      `;

      return new Response(JSON.stringify(messages), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'PATCH') {
      const body = await request.json();
      const id = Number(body?.id);
      const status = String(body?.status || '').toLowerCase();

      if (!Number.isFinite(id) || id <= 0) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid id' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (!ALLOWED_STATUS.has(status)) {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid status. Use: new, read, contacted' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const updated = await sql`
        UPDATE contact_messages
        SET status = ${status}
        WHERE id = ${id}
        RETURNING *;
      `;

      return new Response(JSON.stringify(updated?.[0] ?? null), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Method Not Allowed', { status: 405 });
  } catch (error: any) {
    console.error('Database error:', error);
    const errorMessage = error.message || 'Internal Server Error';

    return new Response(
      JSON.stringify({ success: false, error: `Database Error: ${errorMessage}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
