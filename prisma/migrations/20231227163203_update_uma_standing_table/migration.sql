/*
  Warnings:

  - You are about to drop the column `periode` on the `club_uma_standing` table. All the data in the column will be lost.
  - You are about to drop the column `periode` on the `global_uma_standing` table. All the data in the column will be lost.
  - You are about to alter the column `default_rank_multiplier` on the `match_type` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `mod_rank_multiplier` on the `match_type` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `createdAt` on the `transaction_rp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[player_id,periodMonth,periodYear]` on the table `club_uma_standing` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[player_id,periodMonth,periodYear]` on the table `global_uma_standing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `periodMonth` to the `club_uma_standing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodYear` to the `club_uma_standing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodMonth` to the `global_uma_standing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodYear` to the `global_uma_standing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "club_uma_standing" DROP COLUMN "periode",
ADD COLUMN     "periodMonth" INTEGER NOT NULL,
ADD COLUMN     "periodYear" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "global_uma_standing" DROP COLUMN "periode",
ADD COLUMN     "periodMonth" INTEGER NOT NULL,
ADD COLUMN     "periodYear" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "match_type" ALTER COLUMN "default_rank_multiplier" SET DATA TYPE INTEGER,
ALTER COLUMN "mod_rank_multiplier" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "transaction_rp" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "club_uma_standing_player_id_periodMonth_periodYear_key" ON "club_uma_standing"("player_id", "periodMonth", "periodYear");

-- CreateIndex
CREATE UNIQUE INDEX "global_uma_standing_player_id_periodMonth_periodYear_key" ON "global_uma_standing"("player_id", "periodMonth", "periodYear");
