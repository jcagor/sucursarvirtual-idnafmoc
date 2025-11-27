/*
  Warnings:

  - You are about to drop the column `endDate` on the `CourseSession` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `CourseSession` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `CourseSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `CourseSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseSession" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;
