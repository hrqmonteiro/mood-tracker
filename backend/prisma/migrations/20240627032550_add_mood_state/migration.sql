-- CreateEnum
CREATE TYPE "MoodType" AS ENUM ('EXCITED', 'PLEASANT', 'SAD');

-- CreateTable
CREATE TABLE "MoodState" (
    "id" TEXT NOT NULL,
    "type" "MoodType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MoodState_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MoodState_id_idx" ON "MoodState"("id");
