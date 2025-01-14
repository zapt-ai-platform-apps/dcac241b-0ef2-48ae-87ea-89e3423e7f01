import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const jokes = pgTable('jokes', {
  id: serial('id').primaryKey(),
  setup: text('setup').notNull(),
  punchline: text('punchline').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: uuid('user_id').notNull(),
});

export const userSettings = pgTable('user_settings', {
  userId: uuid('user_id').primaryKey().notNull(),
  contrastOption: text('contrast_option').notNull().default('white'),
  voiceSpeed: text('voice_speed').notNull().default('normal'),
  createdAt: timestamp('created_at').defaultNow(),
});