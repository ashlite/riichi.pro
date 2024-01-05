/*
  Warnings:

  - You are about to drop the column `bioValid` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `telegramId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "bioValid",
DROP COLUMN "telegramId",
ADD COLUMN     "bio_valid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_login" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "telegram_id" TEXT;
