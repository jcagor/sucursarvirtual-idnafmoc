-- AlterEnum
ALTER TYPE "PsyTestGroupAssignationStatus" ADD VALUE 'RETAKE';

-- AlterTable
ALTER TABLE "PsyTestGroupAssignation" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
