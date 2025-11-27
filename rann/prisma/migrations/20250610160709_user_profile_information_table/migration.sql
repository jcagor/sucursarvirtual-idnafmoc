-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "identification_number" TEXT,
    "identification_type" TEXT,
    "type" JSONB,
    "business" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,
    "state" BOOLEAN,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);
