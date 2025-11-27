-- CreateTable
CREATE TABLE "MonthlyReport" (
    "id" UUID NOT NULL,
    "document_type_id" UUID NOT NULL,
    "document_number" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyReport_pkey" PRIMARY KEY ("id")
);
