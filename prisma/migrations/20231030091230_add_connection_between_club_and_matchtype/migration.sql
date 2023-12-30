-- AddForeignKey
ALTER TABLE "match_type" ADD CONSTRAINT "match_type_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE SET NULL ON UPDATE CASCADE;
