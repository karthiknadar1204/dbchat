import { Client } from 'pg';
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { dbConnections } from '@/configs/schema';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(request) {
  try {
    const user = await currentUser();
    const { postgresUrl, connectionName } = await request.json();

    if (!postgresUrl) {
      return NextResponse.json(
        { error: 'PostgreSQL URL is required' },
        { status: 400 }
      );
    }

    if (!connectionName) {
      return NextResponse.json(
        { error: 'Connection name is required' },
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

    // Store connection details in database and get the new row
    const [newConnection] = await db.insert(dbConnections).values({
      userId: user.id,
      connectionName: connectionName,
      postgresUrl: postgresUrl,
      tableSchema: JSON.stringify(tableData.map(t => ({
        tableName: t.tableName,
        columns: t.columns
      }))),
      tableData: JSON.stringify(tableData.map(t => ({
        tableName: t.tableName,
        data: t.data
      })))
    }).returning();

    return NextResponse.json({ 
      id: newConnection.id,
      tables: tableData 
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
