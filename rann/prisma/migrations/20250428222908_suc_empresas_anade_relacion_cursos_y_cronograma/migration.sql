/*
  Warnings:

  - Added the required column `course_id` to the `courseSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "courseSchedule" ADD COLUMN     "course_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "courseSchedule" ADD CONSTRAINT "courseSchedule_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
