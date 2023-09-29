-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_gender_ref_id_fkey" FOREIGN KEY ("gender_ref_id") REFERENCES "reference_helper"("id") ON DELETE SET NULL ON UPDATE CASCADE;
