/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `club` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "club" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "club_slug_key" ON "club"("slug");
