-- CreateTable
CREATE TABLE "CourseCurriculumMesh" (
    "id" UUID NOT NULL,
    "courseSchedule_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "schedule" TEXT NOT NULL,
    "sessionType" TEXT NOT NULL,
    "session" TEXT NOT NULL,

    CONSTRAINT "CourseCurriculumMesh_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseCurriculumMesh" ADD CONSTRAINT "CourseCurriculumMesh_courseSchedule_id_fkey" FOREIGN KEY ("courseSchedule_id") REFERENCES "courseSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
