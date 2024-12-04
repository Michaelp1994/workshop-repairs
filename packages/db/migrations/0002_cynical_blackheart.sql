ALTER TABLE "user_type" RENAME TO "user_role";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "type_id" TO "role_id";--> statement-breakpoint
ALTER TABLE "user_role" DROP CONSTRAINT "user_type_name_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_type_id_user_type_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_role_id_user_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."user_role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_name_unique" UNIQUE("name");