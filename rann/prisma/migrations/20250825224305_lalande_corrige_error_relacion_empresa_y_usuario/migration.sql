/*
  Warnings:

  - You are about to drop the column `userProfileId` on the `BusinessProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BusinessProfile" DROP CONSTRAINT "BusinessProfile_userProfileId_fkey";

-- AlterTable
ALTER TABLE "BusinessProfile" DROP COLUMN "userProfileId";

-- CreateTable
CREATE TABLE "_UserProfileBusiness" (
    "A" UUID NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserProfileBusiness_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserProfileBusiness_B_index" ON "_UserProfileBusiness"("B");

-- AddForeignKey
ALTER TABLE "_UserProfileBusiness" ADD CONSTRAINT "_UserProfileBusiness_A_fkey" FOREIGN KEY ("A") REFERENCES "BusinessProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserProfileBusiness" ADD CONSTRAINT "_UserProfileBusiness_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
