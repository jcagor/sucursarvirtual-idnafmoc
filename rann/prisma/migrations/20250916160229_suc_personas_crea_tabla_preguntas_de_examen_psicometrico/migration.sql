-- CreateEnum
CREATE TYPE "PsyTestDimensionQuestions" AS ENUM ('ATTITUDE', 'DO', 'KNOW');

-- CreateTable
CREATE TABLE "PsyTestQuestions" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "number" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "dimension" "PsyTestDimensionQuestions" NOT NULL,
    "correct_answer" BOOLEAN NOT NULL,
    "exam_id" UUID NOT NULL,

    CONSTRAINT "PsyTestQuestions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PsyTestQuestions" ADD CONSTRAINT "PsyTestQuestions_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "PsyTestExam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
