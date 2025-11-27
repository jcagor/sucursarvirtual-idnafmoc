-- CreateEnum
CREATE TYPE "PsyTestAnswersStatus" AS ENUM ('PENDING', 'INPROGRESS', 'FINALIZED');

-- AlterTable
ALTER TABLE "PsyTestGroupAssignation" ADD COLUMN     "PsyTestAnswers_id" UUID;

-- CreateTable
CREATE TABLE "PsyTestAnswers" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "status" "PsyTestAnswersStatus" NOT NULL,
    "psyTestGroupAssignation_id" UUID NOT NULL,

    CONSTRAINT "PsyTestAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PsyTestSingleAnswers" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "PsyTestQuestions_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" BOOLEAN NOT NULL,
    "psyTestAnswersId" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "PsyTestSingleAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PsyTestAnswers_psyTestGroupAssignation_id_key" ON "PsyTestAnswers"("psyTestGroupAssignation_id");

-- AddForeignKey
ALTER TABLE "PsyTestAnswers" ADD CONSTRAINT "PsyTestAnswers_psyTestGroupAssignation_id_fkey" FOREIGN KEY ("psyTestGroupAssignation_id") REFERENCES "PsyTestGroupAssignation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PsyTestSingleAnswers" ADD CONSTRAINT "PsyTestSingleAnswers_PsyTestQuestions_id_fkey" FOREIGN KEY ("PsyTestQuestions_id") REFERENCES "PsyTestQuestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PsyTestSingleAnswers" ADD CONSTRAINT "PsyTestSingleAnswers_psyTestAnswersId_fkey" FOREIGN KEY ("psyTestAnswersId") REFERENCES "PsyTestAnswers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
