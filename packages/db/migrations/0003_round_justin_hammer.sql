CREATE TYPE "public"."actions" AS ENUM('create', 'read', 'update', 'delete');--> statement-breakpoint
CREATE TYPE "public"."entities" AS ENUM('assets', 'clients', 'repairs', 'locations', 'models', 'manufacturers', 'equipment-types', 'parts', 'users');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_role_permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"entity" "entities" NOT NULL,
	"action" "actions" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer,
	"updated_by_id" integer,
	"deleted_by_id" integer
);
--> statement-breakpoint
ALTER TABLE "user_role" ADD COLUMN "organization_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role_permission" ADD CONSTRAINT "user_role_permission_role_id_user_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."user_role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
