/*
  Warnings:

  - Added the required column `draw` to the `match_participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat` to the `match_participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "match_participant" ADD COLUMN     "draw" BOOLEAN NOT NULL,
ADD COLUMN     "seat" INTEGER NOT NULL;
