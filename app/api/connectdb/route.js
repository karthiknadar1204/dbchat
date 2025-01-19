import { Client } from 'pg';
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { dbConnections, users } from '@/configs/schema';
import { currentUser } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';

export async function POST(request) {
  try {
    const clerkUser = await currentUser();
    const { postgresUrl, connectionName } = await request.json();

    const dbUser = await db.query.users.findFirst({
      where: eq(users.email, clerkUser.emailAddresses[0].emailAddress)
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      );
    }

    if (!postgresUrl || !connectionName) {
      return NextResponse.json(
        { error: 'PostgreSQL URL and connection name are required' },
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


    await db.insert(dbConnections).values({
      userId: dbUser.id,
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
    });

    return NextResponse.json({ tables: tableData });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
