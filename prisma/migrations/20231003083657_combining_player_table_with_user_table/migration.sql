/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `emailVerified` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `player` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `user_id` on the `transaction_cc` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `full_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

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
ALTER TABLE "player" DROP CONSTRAINT "player_rt_id_fkey";

-- DropForeignKey
ALTER TABLE "player" DROP CONSTRAINT "player_user_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_cc" DROP CONSTRAINT "transaction_cc_user_id_fkey";

-- AlterTable
ALTER TABLE "transaction_cc" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "emailVerified",
DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "current_mp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "current_rp" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "ranked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "rt_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "telegramId" TEXT,
ADD COLUMN     "uuid" UUID NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "player";

-- CreateTable
CREATE TABLE "user_meta" (
    "user_id" INTEGER NOT NULL,
    "total_match" INTEGER NOT NULL DEFAULT 0,
    "total_chombo" INTEGER NOT NULL DEFAULT 0,
    "total_first" INTEGER NOT NULL DEFAULT 0,
    "total_second" INTEGER NOT NULL DEFAULT 0,
    "total_third" INTEGER NOT NULL DEFAULT 0,
    "total_fourth" INTEGER NOT NULL DEFAULT 0,
    "avg_ron" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avg_tsumo" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avg_deal_in" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_meta_user_id_key" ON "user_meta"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_uuid_key" ON "user"("uuid");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_rt_id_fkey" FOREIGN KEY ("rt_id") REFERENCES "rank_title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_meta" ADD CONSTRAINT "user_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_member" ADD CONSTRAINT "club_member_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_uma_standing" ADD CONSTRAINT "club_uma_standing_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_uma_standing" ADD CONSTRAINT "global_uma_standing_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_cc" ADD CONSTRAINT "transaction_cc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_participant" ADD CONSTRAINT "match_participant_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
