-- AlterTable
ALTER TABLE "club" ADD COLUMN     "phone_contact" TEXT;

-- AlterTable
ALTER TABLE "club_setting" ADD COLUMN     "hideContact" BOOLEAN NOT NULL DEFAULT true;
