/*
  Warnings:

  - You are about to drop the column `document_type_id` on the `CourseRegistration` table. All the data in the column will be lost.
  - Added the required column `document_type` to the `CourseRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `CourseRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstLastName` to the `CourseRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `CourseRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `CourseRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleLastName` to the `CourseRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `CourseRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `CourseRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CourseRegistration" DROP CONSTRAINT "CourseRegistration_document_type_id_fkey";

-- AlterTable
ALTER TABLE "CourseRegistration" DROP COLUMN "document_type_id",
ADD COLUMN     "document_TypeId" UUID,
ADD COLUMN     "document_type" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstLastName" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "middleLastName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CourseRegistration" ADD CONSTRAINT "CourseRegistration_document_TypeId_fkey" FOREIGN KEY ("document_TypeId") REFERENCES "Document_Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
