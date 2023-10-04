/*
  Warnings:

  - You are about to drop the column `clubStatusId` on the `club` table. All the data in the column will be lost.
  - You are about to drop the column `coverPic` on the `club` table. All the data in the column will be lost.
  - You are about to drop the column `emblemPic` on the `club` table. All the data in the column will be lost.
  - Added the required column `club_status_id` to the `club` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "club" DROP CONSTRAINT "club_clubStatusId_fkey";

-- AlterTable
ALTER TABLE "club" DROP COLUMN "clubStatusId",
DROP COLUMN "coverPic",
DROP COLUMN "emblemPic",
ADD COLUMN     "club_status_id" INTEGER NOT NULL,
ADD COLUMN     "cover_pic" TEXT,
ADD COLUMN     "emblem_pic" TEXT,
ADD COLUMN     "upkeep" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "transaction_cc" ALTER COLUMN "note" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "club" ADD CONSTRAINT "club_club_status_id_fkey" FOREIGN KEY ("club_status_id") REFERENCES "reference_helper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
