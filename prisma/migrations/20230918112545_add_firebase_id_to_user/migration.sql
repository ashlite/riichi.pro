/*
  Warnings:

  - You are about to drop the column `district_code` on the `user` table. All the data in the column will be lost.
  - Added the required column `firebase_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "district_code",
ADD COLUMN     "firebase_id" TEXT NOT NULL;
