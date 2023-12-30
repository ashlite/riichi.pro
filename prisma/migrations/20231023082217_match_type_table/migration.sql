/*
  Warnings:

  - Made the column `type_id` on table `match` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "match" ALTER COLUMN "type_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "match_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "default_rank_multiplier" DOUBLE PRECISION NOT NULL,
    "mod_rank_multiplier" DOUBLE PRECISION NOT NULL,
    "mod_start_date" TIMESTAMP(3) NOT NULL,
    "mod_end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "official" BOOLEAN NOT NULL DEFAULT false,
    "club_id" UUID,
    "cc_base" DOUBLE PRECISION NOT NULL,
    "cc_novice" DOUBLE PRECISION NOT NULL,
    "cc_amateur" DOUBLE PRECISION NOT NULL,
    "cc_pro" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "match_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "match_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
