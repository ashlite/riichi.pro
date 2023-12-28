/*
  Warnings:

  - The primary key for the `club_uma_standing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `club_uma_standing` table. All the data in the column will be lost.
  - The primary key for the `global_uma_standing` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `global_uma_standing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "club_uma_standing" DROP CONSTRAINT "club_uma_standing_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "global_uma_standing" DROP CONSTRAINT "global_uma_standing_pkey",
DROP COLUMN "id";
