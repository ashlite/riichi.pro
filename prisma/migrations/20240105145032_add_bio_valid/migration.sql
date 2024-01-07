/*
  Warnings:

  - Made the column `tnc_agreement` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "bioValid" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "tnc_agreement" SET NOT NULL,
ALTER COLUMN "nationality_country_code" DROP NOT NULL,
ALTER COLUMN "residence_country_code" DROP NOT NULL;
