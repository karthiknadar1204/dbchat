import { db } from "@/configs/db";
import { dbConnections } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { currentUser } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const connections = await db.select({
      id: dbConnections.id,
      connectionName: dbConnections.connectionName,
      createdAt: dbConnections.createdAt
    })
    .from(dbConnections)
    .where(eq(dbConnections.userId, user.id));

    return new Response(JSON.stringify(connections), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}