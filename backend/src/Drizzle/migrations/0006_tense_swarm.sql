CREATE TABLE "baptisms" (
	"baptism_id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone_number" varchar(50) NOT NULL,
	"dob" date,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "membership_transfers" (
	"transfer_id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone_number" varchar(50) NOT NULL,
	"from_church" varchar(255) NOT NULL,
	"to_church" varchar(255) NOT NULL,
	"destination_district" varchar(255) NOT NULL,
	"destination_conference" varchar(255) NOT NULL,
	"destination_location" varchar(255) NOT NULL,
	"reason" text,
	"status" varchar(50) DEFAULT 'pending',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
