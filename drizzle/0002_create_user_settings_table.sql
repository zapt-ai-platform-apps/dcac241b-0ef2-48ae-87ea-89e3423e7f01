CREATE TABLE "user_settings" (
  "user_id" UUID NOT NULL PRIMARY KEY,
  "contrast_option" TEXT NOT NULL DEFAULT 'white',
  "voice_speed" TEXT NOT NULL DEFAULT 'normal',
  "created_at" TIMESTAMP DEFAULT NOW()
);