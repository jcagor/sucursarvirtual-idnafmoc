/*
  Warnings:

  - Added the required column `start_date` to the `TrainingCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainingCourse" ADD COLUMN     "start_date" TIMESTAMPTZ(6) NOT NULL;
