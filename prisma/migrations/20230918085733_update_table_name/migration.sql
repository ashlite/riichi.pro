/*
  Warnings:

  - You are about to drop the column `playerId` on the `club_uma_standing` table. All the data in the column will be lost.
  - You are about to drop the column `totalMatch` on the `club_uma_standing` table. All the data in the column will be lost.
  - You are about to drop the column `totalUma` on the `club_uma_standing` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `global_uma_standing` table. All the data in the column will be lost.
  - You are about to drop the column `totalMatch` on the `global_uma_standing` table. All the data in the column will be lost.
  - You are about to drop the column `totalUma` on the `global_uma_standing` table. All the data in the column will be lost.
  - You are about to drop the column `gainUma` on the `match_participant` table. All the data in the column will be lost.
  - You are about to drop the `TransactionMP` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionRP` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `player_id` to the `club_uma_standing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_uma` to the `club_uma_standing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player_id` to the `global_uma_standing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_uma` to the `global_uma_standing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gain_uma` to the `match_participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionMP" DROP CONSTRAINT "TransactionMP_matchId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionRP" DROP CONSTRAINT "TransactionRP_matchId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionRP" DROP CONSTRAINT "TransactionRP_rtAfterName_fkey";

-- DropForeignKey
ALTER TABLE "TransactionRP" DROP CONSTRAINT "TransactionRP_rtBeforeName_fkey";

-- DropForeignKey
ALTER TABLE "club_uma_standing" DROP CONSTRAINT "club_uma_standing_playerId_fkey";

-- DropForeignKey
ALTER TABLE "global_uma_standing" DROP CONSTRAINT "global_uma_standing_playerId_fkey";

-- AlterTable
ALTER TABLE "club_uma_standing" DROP COLUMN "playerId",
DROP COLUMN "totalMatch",
DROP COLUMN "totalUma",
ADD COLUMN     "player_id" INTEGER NOT NULL,
ADD COLUMN     "total_match" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_uma" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "global_uma_standing" DROP COLUMN "playerId",
DROP COLUMN "totalMatch",
DROP COLUMN "totalUma",
ADD COLUMN     "player_id" INTEGER NOT NULL,
ADD COLUMN     "total_match" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_uma" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "match_participant" DROP COLUMN "gainUma",
ADD COLUMN     "gain_uma" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TransactionMP";

-- DropTable
DROP TABLE "TransactionRP";

-- CreateTable
CREATE TABLE "transaction_rp" (
    "id" UUID NOT NULL,
    "matchId" UUID,
    "note" TEXT,
    "rp_before" INTEGER NOT NULL,
    "rp_move" INTEGER NOT NULL,
    "rp_after" INTEGER NOT NULL,
    "rt_change" BOOLEAN NOT NULL DEFAULT false,
    "rtBeforeName" TEXT,
    "rtAfterName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_rp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_mp" (
    "id" UUID NOT NULL,
    "matchId" UUID,
    "note" TEXT,
    "mp_before" INTEGER NOT NULL,
    "mp_move" INTEGER NOT NULL,
    "mp_after" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_mp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "club_uma_standing" ADD CONSTRAINT "club_uma_standing_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_uma_standing" ADD CONSTRAINT "global_uma_standing_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_rp" ADD CONSTRAINT "transaction_rp_rtBeforeName_fkey" FOREIGN KEY ("rtBeforeName") REFERENCES "rank_title"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_rp" ADD CONSTRAINT "transaction_rp_rtAfterName_fkey" FOREIGN KEY ("rtAfterName") REFERENCES "rank_title"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_rp" ADD CONSTRAINT "transaction_rp_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_mp" ADD CONSTRAINT "transaction_mp_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE SET NULL ON UPDATE CASCADE;
