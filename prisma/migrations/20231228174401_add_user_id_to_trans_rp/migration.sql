/*
  Warnings:

  - Added the required column `userId` to the `transaction_rp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction_rp" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction_rp" ADD CONSTRAINT "transaction_rp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
