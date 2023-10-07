/*
  Warnings:

  - You are about to drop the column `cover_pic` on the `club` table. All the data in the column will be lost.
  - You are about to drop the column `emblem_pic` on the `club` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "club" DROP COLUMN "cover_pic",
DROP COLUMN "emblem_pic",
ADD COLUMN     "coverFile" TEXT,
ADD COLUMN     "emblemFile" TEXT;
