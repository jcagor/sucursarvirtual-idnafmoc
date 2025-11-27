-- CreateTable
CREATE TABLE "UserValidationHistory" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "identification_number" TEXT NOT NULL,
    "identification_type" TEXT NOT NULL,
    "validation_pass" BOOLEAN NOT NULL,
    "response_data" JSON NOT NULL,
    "law" TEXT,
    "business_name" TEXT,
    "business_identification" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "UserValidationHistory_pkey" PRIMARY KEY ("id")
);
