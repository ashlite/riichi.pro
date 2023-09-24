/*
  Warnings:

  - You are about to drop the column `ClubLimit` on the `rank_title` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rank_title" DROP COLUMN "ClubLimit",
ADD COLUMN     "club_limit" INTEGER NOT NULL DEFAULT 1;
