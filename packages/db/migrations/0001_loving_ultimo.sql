ALTER TABLE "part" ADD COLUMN "description" varchar;
UPDATE "part" SET "description" = '';
ALTER TABLE "part" ALTER COLUMN "description" SET NOT NULL;