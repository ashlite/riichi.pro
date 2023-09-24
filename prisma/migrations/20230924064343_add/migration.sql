-- AlterTable
ALTER TABLE "player" ALTER COLUMN "rt_id" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "rank_title" ADD COLUMN     "ClubLimit" INTEGER NOT NULL DEFAULT 1;
