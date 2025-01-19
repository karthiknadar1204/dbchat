import { Client } from 'pg';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { postgresUrl } = await request.json();

    if (!postgresUrl) {
      return NextResponse.json(
        { error: 'PostgreSQL URL is required' },
        { status: 400 }
      );
    }

    const client = new Client({ connectionString: postgresUrl });
    await client.connect();
    console.log('Connected to PostgreSQL', client);

    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
    `);

    await client.end();

    return NextResponse.json({ tables: result.rows });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
