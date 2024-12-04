ALTER TABLE "user_role" DROP CONSTRAINT "user_role_name_unique";--> statement-breakpoint
ALTER TABLE "user_role_permission" ADD CONSTRAINT "user_role_permission_roleId_entity_action_unique" UNIQUE("role_id","entity","action");--> statement-breakpoint
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_name_organizationId_unique" UNIQUE("name","organization_id");