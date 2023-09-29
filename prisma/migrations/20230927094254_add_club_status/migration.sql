/*
  Warnings:

  - Added the required column `clubStatusId` to the `club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "club" ADD COLUMN     "clubStatusId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "club" ADD CONSTRAINT "club_clubStatusId_fkey" FOREIGN KEY ("clubStatusId") REFERENCES "reference_helper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
