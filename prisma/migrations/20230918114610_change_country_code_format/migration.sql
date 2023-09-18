/*
  Warnings:

  - You are about to drop the column `country_iso2` on the `user` table. All the data in the column will be lost.
  - Added the required column `country_code` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "country_iso2",
ADD COLUMN     "country_code" TEXT NOT NULL,
ALTER COLUMN "role_id" SET DEFAULT 101;
