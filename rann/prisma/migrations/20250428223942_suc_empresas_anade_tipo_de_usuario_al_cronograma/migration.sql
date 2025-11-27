/*
  Warnings:

  - Added the required column `typeUser` to the `courseSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courseSchedule" ADD COLUMN     "typeUser" TEXT NOT NULL;
