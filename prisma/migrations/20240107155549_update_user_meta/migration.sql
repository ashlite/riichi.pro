/*
  Warnings:

  - You are about to drop the column `avg_deal_in` on the `user_meta` table. All the data in the column will be lost.
  - You are about to drop the column `avg_ron` on the `user_meta` table. All the data in the column will be lost.
  - You are about to drop the column `avg_tsumo` on the `user_meta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_meta" DROP COLUMN "avg_deal_in",
DROP COLUMN "avg_ron",
DROP COLUMN "avg_tsumo",
ADD COLUMN     "total_deal_in" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_ron" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_tsumo" INTEGER NOT NULL DEFAULT 0;
