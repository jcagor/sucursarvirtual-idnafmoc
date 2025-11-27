/*
  Warnings:

  - You are about to drop the column `document_TypeId` on the `CourseRegistration` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseRegistration" DROP CONSTRAINT "CourseRegistration_document_TypeId_fkey";

-- AlterTable
ALTER TABLE "CourseRegistration" DROP COLUMN "document_TypeId";
