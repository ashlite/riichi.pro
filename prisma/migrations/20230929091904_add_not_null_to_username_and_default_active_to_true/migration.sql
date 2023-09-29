/*
  Warnings:

  - Made the column `username` on table `player` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "player" ALTER COLUMN "active" SET DEFAULT true,
ALTER COLUMN "username" SET NOT NULL;
