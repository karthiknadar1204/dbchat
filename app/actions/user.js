'use server'

import { db } from '@/configs/db'
import { users } from '@/configs/schema'
import { eq } from 'drizzle-orm'

export async function createOrUpdateUser(clerkUser) {
  if (!clerkUser) return null

  try {

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, clerkUser.emailAddresses[0].emailAddress)
    })

    if (existingUser) {
      await db.update(users)
        .set({
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          updatedAt: new Date()
        })
        .where(eq(users.email, clerkUser.emailAddresses[0].emailAddress))
      
      return existingUser
    }


    const newUser = await db.insert(users)
      .values({
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        email: clerkUser.emailAddresses[0].emailAddress,
      })
      .returning()

    return newUser[0]
  } catch (error) {
    console.error('Error creating/updating user:', error)
    throw error
  }
} 