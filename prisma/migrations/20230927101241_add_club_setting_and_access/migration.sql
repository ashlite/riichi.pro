-- AlterTable
ALTER TABLE "club_member" ADD COLUMN     "can_approve_member" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_buy_cc" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_edit_access" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_edit_info" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_edit_setting" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_submit_match" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "can_submit_tournament" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "club_setting" (
    "club_id" UUID NOT NULL,
    "auto_approve_member" BOOLEAN NOT NULL DEFAULT false,
    "first_uma" INTEGER NOT NULL DEFAULT 150,
    "second_uma" INTEGER NOT NULL DEFAULT 50,
    "third_uma" INTEGER NOT NULL DEFAULT -50,
    "fourth_uma" INTEGER NOT NULL DEFAULT -150,
    "chombo_penalty" INTEGER NOT NULL DEFAULT -300,
    "chombo_penalty_other" TEXT,
    "yakuman_bonus" INTEGER NOT NULL DEFAULT 0,
    "yakuman_bonus_other" TEXT,
    "accept_autotable" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "club_setting_club_id_key" ON "club_setting"("club_id");

-- AddForeignKey
ALTER TABLE "club_setting" ADD CONSTRAINT "club_setting_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
