-- AlterTable
ALTER TABLE "PsyTestAnswers" ADD COLUMN     "examName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PsyTestSingleAnswers" ALTER COLUMN "answer" DROP NOT NULL;
