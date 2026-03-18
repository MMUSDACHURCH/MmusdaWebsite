ALTER TABLE "families" RENAME COLUMN "photo" TO "photo_url";--> statement-breakpoint
ALTER TABLE "choirs" ALTER COLUMN "choir_photo" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "choirs" ALTER COLUMN "video_url" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "photo" SET DATA TYPE varchar(5000);--> statement-breakpoint
ALTER TABLE "sermons" ALTER COLUMN "video_url" SET DATA TYPE varchar(500);