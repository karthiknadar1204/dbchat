'use server'

import { currentUser } from '@clerk/nextjs/server'
import OpenAI from 'openai'
import { index } from '@/lib/pinecone'

export async function embeddings(data) {
  const user = await currentUser()
  if (!user) return null

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  try {
    const inputText = Array.isArray(data) ? data : [JSON.stringify(data)]

    const response = await openai.embeddings.create({
      input: inputText,
      model: "text-embedding-3-small"
    });

    console.log('Generated embeddings:', response.data)

    await index.upsert([
      {
        id: `${user.id}-${Date.now()}`,
        values: response.data[0].embedding,
        metadata: {
          connectionName: data.connectionName,
          timestamp: new Date().toISOString(),
          id: data.id
        }
      }
    ])

    console.log('Pinecone upsert successful')
    return response.data[0].embedding

  } catch (error) {
    console.error('Error generating embeddings:', error)
    throw error
  }
}