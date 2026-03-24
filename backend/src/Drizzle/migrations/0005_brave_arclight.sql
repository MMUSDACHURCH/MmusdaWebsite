CREATE TABLE "patrons" (
	"patron_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"message" text,
	"contact_number" varchar(50),
	"image" varchar(500),
	"title" varchar(255) DEFAULT 'Patron',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
