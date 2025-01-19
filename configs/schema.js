import { index, pgTable, serial, text, varchar, timestamp, json } from 'drizzle-orm/pg-core'


export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerk_id', { length: 256 }).notNull().unique(),
  firstName: varchar('first_name', { length: 256 }).notNull(),
  lastName: varchar('last_name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})


export const dbConnections = pgTable('db_connections', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).references(() => users.clerkId).notNull(),
  connectionName: varchar('connection_name', { length: 256 }).notNull(),
  postgresUrl: text('postgres_url').notNull(),
  tableSchema: json('table_schema').notNull(),
  tableData: json('table_data').notNull(),     
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdIdx: index('user_id_idx').on(table.userId)
}))