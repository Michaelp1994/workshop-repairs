CREATE TABLE IF NOT EXISTS "asset_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer,
	CONSTRAINT "asset_status_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "asset" (
	"id" serial PRIMARY KEY NOT NULL,
	"serial_number" varchar NOT NULL,
	"asset_number" varchar NOT NULL,
	"software_version" varchar NOT NULL,
	"status_id" integer NOT NULL,
	"organization_id" integer NOT NULL,
	"model_id" integer NOT NULL,
	"client_id" integer NOT NULL,
	"location_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer,
	CONSTRAINT "asset_serialNumber_organizationId_unique" UNIQUE("serial_number","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "client" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"organization_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer,
	CONSTRAINT "client_name_organizationId_unique" UNIQUE("name","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_verification_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"email" text NOT NULL,
	"code" varchar,
	"expires_at" timestamp NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"two_factor_verified" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "equipment_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image_url" text,
	"organization_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer,
	CONSTRAINT "equipment_type_name_organizationId_unique" UNIQUE("name","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"address" varchar NOT NULL,
	"organization_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer,
	CONSTRAINT "location_name_organizationId_unique" UNIQUE("name","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manufacturer" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"organization_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer,
	CONSTRAINT "manufacturer_name_organizationId_unique" UNIQUE("name","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "model_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar NOT NULL,
	"caption" varchar,
	"model_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "model" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"nickname" varchar NOT NULL,
	"manufacturer_id" integer NOT NULL,
	"organization_id" integer NOT NULL,
	"equipment_type_id" integer NOT NULL,
	"default_image_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer,
	CONSTRAINT "model_name_organizationId_unique" UNIQUE("name","organization_id"),
	CONSTRAINT "model_nickname_organizationId_unique" UNIQUE("nickname","organization_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization_invitation" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"invitation_code" uuid DEFAULT gen_random_uuid(),
	"email_sent_at" timestamp,
	"organization_id" integer NOT NULL,
	CONSTRAINT "organization_invitation_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organization" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"invitation_code" uuid DEFAULT gen_random_uuid(),
	CONSTRAINT "organization_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "part" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"part_number" varchar NOT NULL,
	"organization_id" integer NOT NULL,
	"info" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "parts_to_model" (
	"quantity" integer NOT NULL,
	"part_id" integer NOT NULL,
	"model_id" integer NOT NULL,
	CONSTRAINT "parts_to_model_part_id_model_id_pk" PRIMARY KEY("part_id","model_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repair_comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"repair_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repair_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"caption" varchar NOT NULL,
	"url" varchar NOT NULL,
	"repair_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repair_part" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer NOT NULL,
	"installed" boolean DEFAULT false NOT NULL,
	"repair_id" integer NOT NULL,
	"part_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repair_status_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"colour" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer,
	CONSTRAINT "repair_status_type_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repair_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer,
	CONSTRAINT "repair_type_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repair" (
	"id" serial PRIMARY KEY NOT NULL,
	"fault" varchar NOT NULL,
	"summary" varchar,
	"client_id" integer NOT NULL,
	"organization_id" integer NOT NULL,
	"client_reference" varchar NOT NULL,
	"type_id" integer NOT NULL,
	"status_id" integer NOT NULL,
	"asset_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer NOT NULL,
	"updated_by_id" integer,
	"deleted_by_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_onboarding" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"welcomed" boolean DEFAULT false NOT NULL,
	"invited_users" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_onboarding_userId_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "user_type_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar NOT NULL,
	"last_name" varchar NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar NOT NULL,
	"type_id" integer NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"onboarding_completed" boolean DEFAULT false NOT NULL,
	"organization_id" integer,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"deleted_at" timestamp,
	"created_by_id" integer,
	"updated_by_id" integer,
	"deleted_by_id" integer,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset_status" ADD CONSTRAINT "asset_status_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset_status" ADD CONSTRAINT "asset_status_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset_status" ADD CONSTRAINT "asset_status_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_status_id_asset_status_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."asset_status"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_client_id_model_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."model"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "asset" ADD CONSTRAINT "asset_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client" ADD CONSTRAINT "client_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client" ADD CONSTRAINT "client_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client" ADD CONSTRAINT "client_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "client" ADD CONSTRAINT "client_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email_verification_request" ADD CONSTRAINT "email_verification_request_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "equipment_type" ADD CONSTRAINT "equipment_type_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "equipment_type" ADD CONSTRAINT "equipment_type_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "equipment_type" ADD CONSTRAINT "equipment_type_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "equipment_type" ADD CONSTRAINT "equipment_type_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location" ADD CONSTRAINT "location_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location" ADD CONSTRAINT "location_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location" ADD CONSTRAINT "location_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "location" ADD CONSTRAINT "location_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturer" ADD CONSTRAINT "manufacturer_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturer" ADD CONSTRAINT "manufacturer_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturer" ADD CONSTRAINT "manufacturer_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manufacturer" ADD CONSTRAINT "manufacturer_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model_image" ADD CONSTRAINT "model_image_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model_image" ADD CONSTRAINT "model_image_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model_image" ADD CONSTRAINT "model_image_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model_image" ADD CONSTRAINT "model_image_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model" ADD CONSTRAINT "model_manufacturer_id_manufacturer_id_fk" FOREIGN KEY ("manufacturer_id") REFERENCES "public"."manufacturer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model" ADD CONSTRAINT "model_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model" ADD CONSTRAINT "model_equipment_type_id_equipment_type_id_fk" FOREIGN KEY ("equipment_type_id") REFERENCES "public"."equipment_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model" ADD CONSTRAINT "model_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model" ADD CONSTRAINT "model_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model" ADD CONSTRAINT "model_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "model" ADD CONSTRAINT "model_default_image_id_model_image_id_fk" FOREIGN KEY ("default_image_id") REFERENCES "public"."model_image"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization_invitation" ADD CONSTRAINT "organization_invitation_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "part" ADD CONSTRAINT "part_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "part" ADD CONSTRAINT "part_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "part" ADD CONSTRAINT "part_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "part" ADD CONSTRAINT "part_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "parts_to_model" ADD CONSTRAINT "parts_to_model_part_id_part_id_fk" FOREIGN KEY ("part_id") REFERENCES "public"."part"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "parts_to_model" ADD CONSTRAINT "parts_to_model_model_id_model_id_fk" FOREIGN KEY ("model_id") REFERENCES "public"."model"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_comment" ADD CONSTRAINT "repair_comment_repair_id_repair_id_fk" FOREIGN KEY ("repair_id") REFERENCES "public"."repair"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_comment" ADD CONSTRAINT "repair_comment_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_comment" ADD CONSTRAINT "repair_comment_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_comment" ADD CONSTRAINT "repair_comment_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_image" ADD CONSTRAINT "repair_image_repair_id_repair_id_fk" FOREIGN KEY ("repair_id") REFERENCES "public"."repair"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_image" ADD CONSTRAINT "repair_image_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_image" ADD CONSTRAINT "repair_image_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_image" ADD CONSTRAINT "repair_image_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_part" ADD CONSTRAINT "repair_part_repair_id_repair_id_fk" FOREIGN KEY ("repair_id") REFERENCES "public"."repair"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_part" ADD CONSTRAINT "repair_part_part_id_part_id_fk" FOREIGN KEY ("part_id") REFERENCES "public"."part"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_part" ADD CONSTRAINT "repair_part_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_part" ADD CONSTRAINT "repair_part_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_part" ADD CONSTRAINT "repair_part_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_status_type" ADD CONSTRAINT "repair_status_type_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_status_type" ADD CONSTRAINT "repair_status_type_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_status_type" ADD CONSTRAINT "repair_status_type_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_type" ADD CONSTRAINT "repair_type_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_type" ADD CONSTRAINT "repair_type_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair_type" ADD CONSTRAINT "repair_type_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair" ADD CONSTRAINT "repair_client_id_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair" ADD CONSTRAINT "repair_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair" ADD CONSTRAINT "repair_type_id_repair_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."repair_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair" ADD CONSTRAINT "repair_status_id_repair_status_type_id_fk" FOREIGN KEY ("status_id") REFERENCES "public"."repair_status_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair" ADD CONSTRAINT "repair_asset_id_asset_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."asset"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair" ADD CONSTRAINT "repair_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair" ADD CONSTRAINT "repair_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repair" ADD CONSTRAINT "repair_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_onboarding" ADD CONSTRAINT "user_onboarding_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organization"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_type_id_user_type_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."user_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_created_by_id_user_id_fk" FOREIGN KEY ("created_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_updated_by_id_user_id_fk" FOREIGN KEY ("updated_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_deleted_by_id_user_id_fk" FOREIGN KEY ("deleted_by_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
