-- AlterTable
ALTER TABLE "PsyTestGroup" ADD COLUMN     "crea_course_id" UUID,
ADD COLUMN     "crea_entrepreneurship" BOOLEAN;

-- AddForeignKey
ALTER TABLE "PsyTestGroup" ADD CONSTRAINT "PsyTestGroup_crea_course_id_fkey" FOREIGN KEY ("crea_course_id") REFERENCES "courseSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
