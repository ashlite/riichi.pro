/*
  Warnings:

  - You are about to drop the column `country_code` on the `user` table. All the data in the column will be lost.
  - Added the required column `nationality_country_code` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `residence_country_code` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "country_code",
ADD COLUMN     "nationality_country_code" TEXT NOT NULL,
ADD COLUMN     "residence_country_code" TEXT NOT NULL;
