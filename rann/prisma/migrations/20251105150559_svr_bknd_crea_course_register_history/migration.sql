-- CreateTable
CREATE TABLE "CreaCourseRegisterHistory" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "courseSchedule_id" UUID NOT NULL,
    "students_num" INTEGER NOT NULL,
    "students_min" INTEGER NOT NULL,
    "additional_info" JSONB,
    "new_state" "CourseState" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" BOOLEAN,

    CONSTRAINT "CreaCourseRegisterHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreaCourseRegisterHistory" ADD CONSTRAINT "CreaCourseRegisterHistory_courseSchedule_id_fkey" FOREIGN KEY ("courseSchedule_id") REFERENCES "courseSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
