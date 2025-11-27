/*
  Warnings:

  - Added the required column `cost` to the `courseSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_regional` to the `courseSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseAccess" AS ENUM ('OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "courseSchedule" ADD COLUMN     "accessType" "CourseAccess" NOT NULL DEFAULT 'OPEN',
ADD COLUMN     "cost" INTEGER NOT NULL,
ADD COLUMN     "id_regional" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_CourseScheduleEligibleBusiness" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_CourseScheduleEligibleBusiness_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CourseScheduleEligibleBusiness_B_index" ON "_CourseScheduleEligibleBusiness"("B");

-- AddForeignKey
ALTER TABLE "_CourseScheduleEligibleBusiness" ADD CONSTRAINT "_CourseScheduleEligibleBusiness_A_fkey" FOREIGN KEY ("A") REFERENCES "BusinessProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseScheduleEligibleBusiness" ADD CONSTRAINT "_CourseScheduleEligibleBusiness_B_fkey" FOREIGN KEY ("B") REFERENCES "courseSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
