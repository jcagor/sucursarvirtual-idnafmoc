/*
  Warnings:

  - The primary key for the `TechAssistanceRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TechAssistanceRecord` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `TrainingCourse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `TrainingCourse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `appointment_id` on the `TechAssistanceRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TechAssistanceRecord" DROP CONSTRAINT "TechAssistanceRecord_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "appointment_id",
ADD COLUMN     "appointment_id" UUID NOT NULL,
ADD CONSTRAINT "TechAssistanceRecord_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TrainingCourse" DROP CONSTRAINT "TrainingCourses_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "TrainingCourses_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "TrainingCourseSchedule" (
    "id" UUID NOT NULL,
    "training_course_id" UUID NOT NULL,
    "course_schedule_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingCourseSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechRecordRevision" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "record_id" UUID NOT NULL,
    "review" JSONB NOT NULL,
    "status" TEXT,
    "identification_type" TEXT NOT NULL,
    "identification_number" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "state" BOOLEAN,

    CONSTRAINT "TechRecordRevision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrainingCourseSchedule_training_course_id_course_schedule_i_key" ON "TrainingCourseSchedule"("training_course_id", "course_schedule_id");

-- AddForeignKey
ALTER TABLE "TrainingCourseSchedule" ADD CONSTRAINT "TrainingCourseSchedule_training_course_id_fkey" FOREIGN KEY ("training_course_id") REFERENCES "TrainingCourse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCourseSchedule" ADD CONSTRAINT "TrainingCourseSchedule_course_schedule_id_fkey" FOREIGN KEY ("course_schedule_id") REFERENCES "courseSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechAssistanceRecord" ADD CONSTRAINT "Appointment_fkey" FOREIGN KEY ("appointment_id") REFERENCES "Appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TechRecordRevision" ADD CONSTRAINT "TechAssistanceRecord_fkey" FOREIGN KEY ("record_id") REFERENCES "TechAssistanceRecord"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
