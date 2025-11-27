-- CreateEnum
CREATE TYPE "PsyTestGroupStatus" AS ENUM ('PENDING', 'INPROGRESS', 'FINALIZED');

-- CreateTable
CREATE TABLE "PsyTestExam" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "state" BOOLEAN,

    CONSTRAINT "PsyTestExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PsyTestGroup" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "sequence" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number_persons" DECIMAL NOT NULL DEFAULT 0,
    "file_name" TEXT NOT NULL,
    "md5_sum" TEXT NOT NULL,
    "current_status" "PsyTestGroupStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "state" BOOLEAN,

    CONSTRAINT "PsyTestGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PsyTestGroupAssignation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "PsyTestPerson_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "PsyTestGroup_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "PsyTestExam_id" UUID NOT NULL,

    CONSTRAINT "PsyTestGroupAssignation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PsyTestPerson" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "document_type" TEXT NOT NULL DEFAULT 'CC',
    "document_number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "groups_id" UUID,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "state" BOOLEAN,

    CONSTRAINT "PsyTestPerson_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PsyTestGroupAssignation" ADD CONSTRAINT "PsyTestGroupAssignation_PsyTestExam_id_fkey" FOREIGN KEY ("PsyTestExam_id") REFERENCES "PsyTestExam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PsyTestGroupAssignation" ADD CONSTRAINT "PsyTestGroupAssignation_PsyTestGroup_id_fkey" FOREIGN KEY ("PsyTestGroup_id") REFERENCES "PsyTestGroup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PsyTestGroupAssignation" ADD CONSTRAINT "PsyTestGroupAssignation_PsyTestPerson_id_fkey" FOREIGN KEY ("PsyTestPerson_id") REFERENCES "PsyTestPerson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
