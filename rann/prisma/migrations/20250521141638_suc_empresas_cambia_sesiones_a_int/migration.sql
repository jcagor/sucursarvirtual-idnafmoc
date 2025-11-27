/*
  Warnings:

  - Changed the type of `sessions` on the `courseSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "courseSchedule" DROP COLUMN "sessions",
ADD COLUMN     "sessions" INTEGER NOT NULL;
