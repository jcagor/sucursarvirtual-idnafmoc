-- CreateTable
CREATE TABLE "SelfManagement" (
    "id" UUID NOT NULL,
    "document_type_id" UUID NOT NULL,
    "document_number" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "analysis" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SelfManagement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SelfManagement" ADD CONSTRAINT "SelfManagement_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
