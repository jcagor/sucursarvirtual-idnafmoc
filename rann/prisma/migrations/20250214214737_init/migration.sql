-- CreateTable
CREATE TABLE "Document_Type" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProfile" (
    "id" UUID NOT NULL,
    "document_type_id" UUID NOT NULL,
    "document_number" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessProfile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessProfile" ADD CONSTRAINT "BusinessProfile_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO public."Document_Type"(id, name, "updatedAt") VALUES 
(gen_random_uuid(), 'CC', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'CE', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'DNI', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'PPT', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'TI', CURRENT_TIMESTAMP);