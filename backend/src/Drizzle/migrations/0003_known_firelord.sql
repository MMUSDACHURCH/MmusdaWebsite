CREATE TABLE "elders" (
	"elder_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"message" text,
	"contact_number" varchar(50),
	"image" varchar(500),
	"role" varchar(255) DEFAULT 'Elder',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "pastors" (
	"pastor_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"message" text,
	"contact_number" varchar(50),
	"image" varchar(500),
	"title" varchar(255) DEFAULT 'Pastor',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
