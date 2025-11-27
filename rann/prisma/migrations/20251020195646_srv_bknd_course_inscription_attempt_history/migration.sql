-- CreateTable
CREATE TABLE "CourseInscriptionAttemptHistory" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "identification_type" TEXT NOT NULL,
    "identification_number" TEXT NOT NULL,
    "courseSchedule_id" UUID NOT NULL,
    "additional_info" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" BOOLEAN,

    CONSTRAINT "CourseInscriptionAttemptHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseInscriptionAttemptHistory" ADD CONSTRAINT "CourseInscriptionAttemptHistory_courseSchedule_id_fkey" FOREIGN KEY ("courseSchedule_id") REFERENCES "courseSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
