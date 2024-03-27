/*
  Warnings:

  - You are about to drop the column `type` on the `transaction_cc` table. All the data in the column will be lost.
  - Added the required column `type_id` to the `transaction_cc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction_cc" DROP COLUMN "type",
ADD COLUMN     "type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction_cc" ADD CONSTRAINT "transaction_cc_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "reference_helper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
