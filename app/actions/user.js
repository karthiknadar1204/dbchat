'use server'

import { db } from '@/configs/db'
import { users } from '@/configs/schema'
import { eq } from 'drizzle-orm'
import { currentUser } from '@clerk/nextjs/server'

export async function createOrUpdateUser() {
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, clerkUser.emailAddresses[0].emailAddress)
    })

    if (existingUser) {
      // Update existing user
      await db.update(users)
        .set({
          firstName: clerkUser.firstName,
          lastName: clerkUser.lastName,
          clerkId: clerkUser.id,
          updatedAt: new Date()
        })
        .where(eq(users.email, clerkUser.emailAddresses[0].emailAddress))
      
      return existingUser
    }

    // Create new user
    const newUser = await db.insert(users)
      .values({
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        email: clerkUser.emailAddresses[0].emailAddress,
        clerkId: clerkUser.id
      })
      .returning()

    return newUser[0]
  } catch (error) {
    console.error('Error creating/updating user:', error)
    throw error
  }
}