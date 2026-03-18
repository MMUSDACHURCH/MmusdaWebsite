CREATE TABLE "admins" (
	"admin_id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "announcements" (
	"announcement_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"created_by" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "choirs" (
	"choir_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"leader_name" varchar(255) NOT NULL,
	"description" text,
	"choir_photo" "bytea",
	"video_url" text,
	"members_count" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "contacts" (
	"contact_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"message" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "departments" (
	"department_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"admin_leader" varchar(255) NOT NULL,
	"assistant" varchar(255),
	"admin_contact" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "events" (
	"event_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"event_date" date NOT NULL,
	"photo" "bytea",
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "families" (
	"family_id" serial PRIMARY KEY NOT NULL,
	"family_name" varchar(255) NOT NULL,
	"head_of_family" varchar(255) NOT NULL,
	"contact_info" varchar(255),
	"leader_contact" varchar(255),
	"photo" "bytea",
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "homechurches" (
	"homechurch_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"leader_name" varchar(255),
	"leader_contact" varchar(255),
	"description" text,
	"location" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "leaders" (
	"leader_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"department" varchar(255),
	"contact_info" varchar(255) DEFAULT null,
	"role" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "members" (
	"member_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"area_of_residence" varchar(255) NOT NULL,
	"email" varchar(255),
	"phone" varchar(50),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "offering_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone_number" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "offerings" (
	"offering_id" serial PRIMARY KEY NOT NULL,
	"phone_number" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"amount" integer NOT NULL,
	"purpose" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "prayer_requests" (
	"request_id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"phone_number" varchar(50) DEFAULT null,
	"title" varchar(255) NOT NULL,
	"description" text,
	"requested_by" integer,
	"is_public" varchar(3) DEFAULT 'yes',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "registered_admins" (
	"registered_id" serial PRIMARY KEY NOT NULL,
	"admin_id" integer NOT NULL,
	"password" varchar(255) NOT NULL,
	"is_verified" boolean DEFAULT false,
	"verification_code" varchar(10),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sermons" (
	"sermon_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"sermon_date" date NOT NULL,
	"description" text,
	"video_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "suggestions" (
	"suggestion_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"contact_number" varchar(50),
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
