import * as Sentry from "@sentry/node";
Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

import { authenticateUser } from "./_apiUtils.js";
import { userSettings } from "../drizzle/schema.js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";

export default async function handler(req, res) {
  try {
    const user = await authenticateUser(req);
    const client = postgres(process.env.COCKROACH_DB_URL);
    const db = drizzle(client);

    if (req.method === 'GET') {
      console.log('[settings.js] Handling GET user settings for user:', user.id);
      const [existing] = await db.select().from(userSettings).where(eq(userSettings.userId, user.id));
      if (!existing) {
        // Insert defaults if none exist
        await db.insert(userSettings).values({ userId: user.id }).onConflictDoNothing();
        const [inserted] = await db.select().from(userSettings).where(eq(userSettings.userId, user.id));
        return res.status(200).json(inserted);
      }
      return res.status(200).json(existing);
    }

    if (req.method === 'POST') {
      console.log('[settings.js] Handling POST update settings for user:', user.id);
      const { contrastOption, voiceSpeed } = req.body;
      await db.insert(userSettings).values({
        userId: user.id,
        contrastOption,
        voiceSpeed
      }).onConflictUpdate({
        target: userSettings.userId,
        set: { contrastOption, voiceSpeed }
      });
      const [updated] = await db.select().from(userSettings).where(eq(userSettings.userId, user.id));
      return res.status(200).json(updated);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    Sentry.captureException(error);
    console.error('[settings.js] Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}