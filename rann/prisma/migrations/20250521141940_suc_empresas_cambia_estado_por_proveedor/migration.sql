/*
  Warnings:

  - You are about to drop the column `state` on the `courseSchedule` table. All the data in the column will be lost.
  - Added the required column `supplier` to the `courseSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courseSchedule" DROP COLUMN "state",
ADD COLUMN     "supplier" TEXT NOT NULL;
