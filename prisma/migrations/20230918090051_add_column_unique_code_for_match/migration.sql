/*
  Warnings:

  - Added the required column `player_unique_code` to the `match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "match" ADD COLUMN     "player_unique_code" TEXT NOT NULL;
