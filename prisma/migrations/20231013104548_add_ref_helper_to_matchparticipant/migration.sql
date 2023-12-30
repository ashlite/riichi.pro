/*
  Warnings:

  - You are about to drop the column `seat` on the `match_participant` table. All the data in the column will be lost.
  - Added the required column `seatRefId` to the `match_participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "match_participant" DROP COLUMN "seat",
ADD COLUMN     "seatRefId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "match_participant" ADD CONSTRAINT "match_participant_seatRefId_fkey" FOREIGN KEY ("seatRefId") REFERENCES "reference_helper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
