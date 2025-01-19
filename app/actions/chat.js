"use server";

import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { index } from "@/lib/pinecone";

export async function embeddings(data) {
  const user = await currentUser();
  if (!user) return null;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {

    const schemaText = data.tables.map(t => ({
      tableName: t.tableName,
      columns: t.columns.map(c => `${c.column_name} (${c.data_type})`).join(', ')
    }));

    const dataText = data.tables.map(t => ({
      tableName: t.tableName,
      sampleData: t.data.slice(0, 5) 
    }));


    const schemaEmbedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: JSON.stringify(schemaText)
    });

    const dataEmbedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: JSON.stringify(dataText)
    });


    await index.upsert([
      {
        id: `schema-${String(data.id)}`,
        values: schemaEmbedding.data[0].embedding,
        metadata: {
          type: 'schema',
          connectionId: String(data.id),
          connectionName: data.connectionName,
          timestamp: new Date().toISOString(),
          schema: JSON.stringify(schemaText)
        },
      },
      {
        id: `data-${String(data.id)}`,
        values: dataEmbedding.data[0].embedding,
        metadata: {
          type: 'data',
          connectionId: String(data.id),
          connectionName: data.connectionName,
          timestamp: new Date().toISOString(),
          data: JSON.stringify(dataText)
        },
      }
    ]);

    console.log("Pinecone upsert successful for both schema and data");
    return true;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}

export async function fetchFromEmbeddings({ message, connectionId }) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const questionEmbedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: message,
    });


    const queryResult = await index.query({
      vector: questionEmbedding.data[0].embedding,
      topK: 10,
      filter: {
        connectionId: { $eq: String(connectionId) }
      },
      includeMetadata: true,
      includeValues: true
    });


    const schemaInfo = queryResult.matches.find(m => m.metadata.type === 'schema')?.metadata?.schema || "";
    const dataInfo = queryResult.matches.find(m => m.metadata.type === 'data')?.metadata?.data || "";

    const relevantInfo = {
      schema: JSON.parse(schemaInfo),
      sampleData: JSON.parse(dataInfo)
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: [
        {
          role: "system",
          content: `You are a database expert analyzing PostgreSQL database schemas. Your responses should be clear and direct:

1. When the user asks for SQL:
   - Return only the SQL query without explanation
   - Ensure the query is valid for the provided schema
   - Use proper syntax and formatting

2. For all other questions:
   - Analyze the provided schema information
   - Give direct, factual answers about the database structure
   - Focus on table relationships and data organization
   - Avoid mentioning SQL unless specifically asked

Keep responses concise and relevant to the database structure being discussed.`,
        },
        {
          role: "assistant",
          content: `Here is the database information: ${JSON.stringify(relevantInfo)}`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error in fetchFromEmbeddings:", error);
    throw error;
  }
}



