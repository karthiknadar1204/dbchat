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


    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema='public'
    `);

    const tables = tablesResult.rows;
    const tableData = [];


    for (const table of tables) {
      const tableName = table.table_name;
      

      const columnsResult = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema='public' 
        AND table_name=$1
      `, [tableName]);


      const dataResult = await client.query(`
        SELECT * FROM "${tableName}" LIMIT 100
      `);

      tableData.push({
        tableName,
        columns: columnsResult.rows,
        data: dataResult.rows
      });
    }

    await client.end();

    return NextResponse.json({ tables: tableData });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
