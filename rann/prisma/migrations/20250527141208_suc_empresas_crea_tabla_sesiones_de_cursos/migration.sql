-- CreateTable
CREATE TABLE "CourseSession" (
    "id" UUID NOT NULL,
    "courseSchedule_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "typeSession" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseSession" ADD CONSTRAINT "CourseSession_courseSchedule_id_fkey" FOREIGN KEY ("courseSchedule_id") REFERENCES "courseSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
