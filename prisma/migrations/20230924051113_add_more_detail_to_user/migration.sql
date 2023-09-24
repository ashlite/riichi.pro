-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT,
ADD COLUMN     "ban_expiration" TIMESTAMP(3),
ADD COLUMN     "ban_reason" TEXT,
ADD COLUMN     "ban_status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "baned_at" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "phone_country" TEXT,
ADD COLUMN     "real_id" TEXT,
ADD COLUMN     "tnc_agreement" BOOLEAN DEFAULT true;
