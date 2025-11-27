/*
  Warnings:

  - You are about to drop the column `retake_id` on the `PsyTestGroupAssignation` table. All the data in the column will be lost.
  - You are about to drop the column `retake_reason` on the `PsyTestGroupAssignation` table. All the data in the column will be lost.
  - Added the required column `results` to the `PsyTestAnswers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PsyTestCompetencyQuestions" AS ENUM ('VISION_OF_THE_FUTURE', 'SOCIAL_SENSITIVITY', 'LEADERSHIP', 'DECISION_MAKING', 'ACHIEVEMENT_ORIENTATION', 'ACTION_INITIATIVE', 'NETWORK_BUILDING', 'CREATIVITY', 'ADAPTATION_TO_CHANGE');

-- AlterTable
ALTER TABLE "PsyTestAnswers" ADD COLUMN     "results" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "PsyTestQuestions" ADD COLUMN     "competency" "PsyTestCompetencyQuestions"[];
