-- AlterTable
ALTER TABLE "PsyTestGroupAssignation" ADD COLUMN     "retake_id" UUID,
ADD COLUMN     "retake_reason" TEXT;

-- AddForeignKey
ALTER TABLE "PsyTestGroupAssignation" ADD CONSTRAINT "PsyTestGroupAssignation_retake_id_fkey" FOREIGN KEY ("retake_id") REFERENCES "PsyTestGroupAssignation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
