/*
  Warnings:

  - Added the required column `description` to the `courseSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseState" AS ENUM ('Created', 'Cancelled', 'Active');

-- AlterTable
ALTER TABLE "courseSchedule" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "state" "CourseState" NOT NULL DEFAULT 'Created';
