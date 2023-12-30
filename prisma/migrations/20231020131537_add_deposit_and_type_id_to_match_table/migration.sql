/*
  Warnings:

  - You are about to drop the column `type` on the `match` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "match" DROP COLUMN "type",
ADD COLUMN     "deposit" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "type_id" INTEGER;
