-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "iconUrl" TEXT;

-- CreateTable
CREATE TABLE "programSchedule" (
    "id" UUID NOT NULL,
    "program_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "programSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programSession" (
    "id" UUID NOT NULL,
    "programSchedule_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "typeSession" TEXT NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "programSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "programSchedule" ADD CONSTRAINT "programSchedule_program_id_fkey" FOREIGN KEY ("program_id") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programSession" ADD CONSTRAINT "programSession_programSchedule_id_fkey" FOREIGN KEY ("programSchedule_id") REFERENCES "programSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
