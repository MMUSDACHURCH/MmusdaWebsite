CREATE TABLE "dedications" (
	"dedication_id" serial PRIMARY KEY NOT NULL,
	"child_name" varchar(255) NOT NULL,
	"father_name" varchar(255) NOT NULL,
	"mother_name" varchar(255) NOT NULL,
	"available_date" date NOT NULL,
	"contact_number" varchar(50),
	"email" varchar(255),
	"status" varchar(50) DEFAULT 'pending',
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "testimonies" (
	"testimony_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"is_approved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
