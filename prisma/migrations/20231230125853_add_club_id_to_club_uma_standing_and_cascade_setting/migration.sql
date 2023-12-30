/*
  Warnings:

  - You are about to drop the column `periodMonth` on the `club_uma_standing` table. All the data in the column will be lost.
  - You are about to drop the column `periodYear` on the `club_uma_standing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[player_id,club_id,period_month,period_year]` on the table `club_uma_standing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `club_id` to the `club_uma_standing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period_month` to the `club_uma_standing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period_year` to the `club_uma_standing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "club_member" DROP CONSTRAINT "club_member_club_id_fkey";

-- DropForeignKey
ALTER TABLE "club_setting" DROP CONSTRAINT "club_setting_club_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_cc" DROP CONSTRAINT "transaction_cc_club_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_rp" DROP CONSTRAINT "transaction_rp_matchId_fkey";

-- DropIndex
DROP INDEX "club_uma_standing_player_id_periodMonth_periodYear_key";

-- AlterTable
ALTER TABLE "club_uma_standing" DROP COLUMN "periodMonth",
DROP COLUMN "periodYear",
ADD COLUMN     "club_id" UUID NOT NULL,
ADD COLUMN     "period_month" INTEGER NOT NULL,
ADD COLUMN     "period_year" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "club_uma_standing_player_id_club_id_period_month_period_yea_key" ON "club_uma_standing"("player_id", "club_id", "period_month", "period_year");

-- AddForeignKey
ALTER TABLE "club_setting" ADD CONSTRAINT "club_setting_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_member" ADD CONSTRAINT "club_member_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_uma_standing" ADD CONSTRAINT "club_uma_standing_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_cc" ADD CONSTRAINT "transaction_cc_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_rp" ADD CONSTRAINT "transaction_rp_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
