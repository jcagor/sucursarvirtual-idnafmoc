-- CreateTable
CREATE TABLE "CourseRegistration" (
    "id" UUID NOT NULL,
    "courseSchedule_id" UUID NOT NULL,
    "document_number" TEXT NOT NULL,
    "document_type_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseRegistration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseRegistration" ADD CONSTRAINT "CourseRegistration_courseSchedule_id_fkey" FOREIGN KEY ("courseSchedule_id") REFERENCES "courseSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseRegistration" ADD CONSTRAINT "CourseRegistration_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
