/*
  Warnings:

  - You are about to drop the column `threshold_mp` on the `rank_title` table. All the data in the column will be lost.
  - You are about to drop the `transaction_mp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transaction_mp" DROP CONSTRAINT "transaction_mp_matchId_fkey";

-- AlterTable
ALTER TABLE "player" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "rank_title" DROP COLUMN "threshold_mp";

-- DropTable
DROP TABLE "transaction_mp";
