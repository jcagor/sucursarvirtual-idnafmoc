/*
  Warnings:

  - Added the required column `coursePostulation_id` to the `CourseRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseRegistration" ADD COLUMN     "coursePostulation_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "CoursePostulation" (
    "id" UUID NOT NULL,
    "courseSchedule_id" UUID NOT NULL,
    "document_number" TEXT NOT NULL,
    "document_type_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoursePostulation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoursePostulation" ADD CONSTRAINT "CoursePostulation_courseSchedule_id_fkey" FOREIGN KEY ("courseSchedule_id") REFERENCES "courseSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePostulation" ADD CONSTRAINT "CoursePostulation_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseRegistration" ADD CONSTRAINT "CourseRegistration_coursePostulation_id_fkey" FOREIGN KEY ("coursePostulation_id") REFERENCES "CoursePostulation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
