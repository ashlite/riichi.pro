/*
  Warnings:

  - You are about to drop the column `player_id` on the `club_uma_standing` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `current_mp` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firebase_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `global_uma_standing` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,club_id,period_month,period_year]` on the table `club_uma_standing` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seqId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `club_uma_standing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "club_member" DROP CONSTRAINT "club_member_player_id_fkey";

-- DropForeignKey
ALTER TABLE "club_uma_standing" DROP CONSTRAINT "club_uma_standing_player_id_fkey";

-- DropForeignKey
ALTER TABLE "global_uma_standing" DROP CONSTRAINT "global_uma_standing_player_id_fkey";

-- DropForeignKey
ALTER TABLE "match_participant" DROP CONSTRAINT "match_participant_player_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_cc" DROP CONSTRAINT "transaction_cc_user_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_rp" DROP CONSTRAINT "transaction_rp_userId_fkey";

-- DropForeignKey
ALTER TABLE "user_meta" DROP CONSTRAINT "user_meta_user_id_fkey";

-- DropIndex
DROP INDEX "club_uma_standing_player_id_club_id_period_month_period_yea_key";

-- DropIndex
DROP INDEX "user_firebase_id_key";

-- DropIndex
DROP INDEX "user_uuid_key";

-- AlterTable
ALTER TABLE "club_member" ALTER COLUMN "player_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "club_uma_standing" DROP COLUMN "player_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "match_participant" ALTER COLUMN "player_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "transaction_cc" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "transaction_rp" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "current_mp",
DROP COLUMN "firebase_id",
DROP COLUMN "uuid",
ADD COLUMN     "current_tp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "seqId" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AlterTable
ALTER TABLE "user_meta" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "global_uma_standing";

-- CreateIndex
CREATE UNIQUE INDEX "club_uma_standing_user_id_club_id_period_month_period_year_key" ON "club_uma_standing"("user_id", "club_id", "period_month", "period_year");

-- CreateIndex
CREATE UNIQUE INDEX "user_seqId_key" ON "user"("seqId");

-- AddForeignKey
ALTER TABLE "user_meta" ADD CONSTRAINT "user_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_member" ADD CONSTRAINT "club_member_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_uma_standing" ADD CONSTRAINT "club_uma_standing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_cc" ADD CONSTRAINT "transaction_cc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_rp" ADD CONSTRAINT "transaction_rp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_participant" ADD CONSTRAINT "match_participant_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
