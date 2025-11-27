-- DropForeignKey
ALTER TABLE "CourseRegistration" DROP CONSTRAINT "CourseRegistration_coursePostulation_id_fkey";

-- AlterTable
ALTER TABLE "CourseRegistration" ALTER COLUMN "coursePostulation_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CourseRegistration" ADD CONSTRAINT "CourseRegistration_coursePostulation_id_fkey" FOREIGN KEY ("coursePostulation_id") REFERENCES "CoursePostulation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
