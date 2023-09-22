-- CreateTable
CREATE TABLE "reference_helper" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "group" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reference_helper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "country_code" TEXT NOT NULL,
    "district" TEXT,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role_id" INTEGER NOT NULL DEFAULT 101,
    "firebase_id" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player" (
    "id" SERIAL NOT NULL,
    "alias" TEXT,
    "user_id" UUID NOT NULL,
    "total_match" INTEGER NOT NULL DEFAULT 0,
    "total_chombo" INTEGER NOT NULL DEFAULT 0,
    "current_rp" INTEGER NOT NULL DEFAULT 0,
    "current_mp" INTEGER NOT NULL DEFAULT 0,
    "avg_ron" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avg_tsumo" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avg_deal_in" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "rt_id" INTEGER NOT NULL,
    "ranked_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rank_title" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "group_ref_id" INTEGER NOT NULL,
    "skillIndex" INTEGER NOT NULL,
    "first" INTEGER NOT NULL,
    "second" INTEGER NOT NULL,
    "third" INTEGER NOT NULL,
    "fourth" INTEGER NOT NULL,
    "base_rp" INTEGER NOT NULL,
    "promotion_rp" INTEGER NOT NULL,
    "demotion" BOOLEAN NOT NULL,
    "threshold_mp" INTEGER NOT NULL,

    CONSTRAINT "rank_title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "emblemPic" TEXT,
    "coverPic" TEXT,
    "description" TEXT,
    "country_name" TEXT NOT NULL,
    "country_iso2" TEXT NOT NULL,
    "total_member" INTEGER NOT NULL DEFAULT 0,
    "total_main_member" INTEGER NOT NULL DEFAULT 0,
    "max_admin" INTEGER NOT NULL DEFAULT 3,
    "district" TEXT,
    "address" TEXT,
    "email_contact" TEXT,
    "currentCC" INTEGER NOT NULL DEFAULT 0,
    "spendCC" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club_member" (
    "id" SERIAL NOT NULL,
    "player_id" INTEGER NOT NULL,
    "club_id" UUID NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "club_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "club_uma_standing" (
    "id" UUID NOT NULL,
    "player_id" INTEGER NOT NULL,
    "total_uma" INTEGER NOT NULL,
    "total_match" INTEGER NOT NULL DEFAULT 0,
    "periode" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "club_uma_standing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "global_uma_standing" (
    "id" TEXT NOT NULL,
    "player_id" INTEGER NOT NULL,
    "total_uma" INTEGER NOT NULL,
    "total_match" INTEGER NOT NULL DEFAULT 0,
    "periode" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "global_uma_standing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_cc" (
    "id" UUID NOT NULL,
    "club_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "cc_before" INTEGER NOT NULL,
    "cc_move" INTEGER NOT NULL,
    "cc_after" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" INTEGER NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "transaction_cc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_rp" (
    "id" UUID NOT NULL,
    "matchId" UUID,
    "note" TEXT,
    "rp_before" INTEGER NOT NULL,
    "rp_move" INTEGER NOT NULL,
    "rp_after" INTEGER NOT NULL,
    "rt_change" BOOLEAN NOT NULL DEFAULT false,
    "rt_id_before" INTEGER,
    "rt_id_after" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_rp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_mp" (
    "id" UUID NOT NULL,
    "matchId" UUID,
    "note" TEXT,
    "mp_before" INTEGER NOT NULL,
    "mp_move" INTEGER NOT NULL,
    "mp_after" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_mp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "match_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "type" INTEGER NOT NULL,
    "official_rule" BOOLEAN NOT NULL,
    "club_id" UUID,
    "creator_member_id" INTEGER,
    "cost_cc" INTEGER NOT NULL,
    "player_unique_code" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match_participant" (
    "player_id" INTEGER NOT NULL,
    "rank_id" UUID NOT NULL,
    "score" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "player_rt_id" INTEGER NOT NULL,
    "avg_match_skill" DOUBLE PRECISION NOT NULL,
    "chombo" INTEGER NOT NULL DEFAULT 0,
    "ron" INTEGER,
    "tsumo" INTEGER,
    "deal_in" INTEGER,
    "gain_uma" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_firebase_id_key" ON "user"("firebase_id");

-- CreateIndex
CREATE UNIQUE INDEX "player_alias_key" ON "player"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "player_user_id_key" ON "player"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "rank_title_name_key" ON "rank_title"("name");

-- CreateIndex
CREATE UNIQUE INDEX "match_participant_player_id_rank_id_key" ON "match_participant"("player_id", "rank_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "reference_helper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_rt_id_fkey" FOREIGN KEY ("rt_id") REFERENCES "rank_title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rank_title" ADD CONSTRAINT "rank_title_group_ref_id_fkey" FOREIGN KEY ("group_ref_id") REFERENCES "reference_helper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_member" ADD CONSTRAINT "club_member_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_member" ADD CONSTRAINT "club_member_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_member" ADD CONSTRAINT "club_member_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "reference_helper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_uma_standing" ADD CONSTRAINT "club_uma_standing_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "global_uma_standing" ADD CONSTRAINT "global_uma_standing_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_cc" ADD CONSTRAINT "transaction_cc_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_cc" ADD CONSTRAINT "transaction_cc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_rp" ADD CONSTRAINT "transaction_rp_rt_id_before_fkey" FOREIGN KEY ("rt_id_before") REFERENCES "rank_title"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_rp" ADD CONSTRAINT "transaction_rp_rt_id_after_fkey" FOREIGN KEY ("rt_id_after") REFERENCES "rank_title"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_rp" ADD CONSTRAINT "transaction_rp_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_mp" ADD CONSTRAINT "transaction_mp_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_club_id_fkey" FOREIGN KEY ("club_id") REFERENCES "club"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match" ADD CONSTRAINT "match_creator_member_id_fkey" FOREIGN KEY ("creator_member_id") REFERENCES "club_member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_participant" ADD CONSTRAINT "match_participant_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_participant" ADD CONSTRAINT "match_participant_rank_id_fkey" FOREIGN KEY ("rank_id") REFERENCES "match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "match_participant" ADD CONSTRAINT "match_participant_player_rt_id_fkey" FOREIGN KEY ("player_rt_id") REFERENCES "rank_title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
