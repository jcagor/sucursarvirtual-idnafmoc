-- CreateTable
CREATE TABLE "BusinessUnregisteredHistory" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "identification_number" TEXT NOT NULL,
    "identification_type" TEXT NOT NULL,
    "state" BOOLEAN,

    CONSTRAINT "BusinessUnregisteredHistory_pkey" PRIMARY KEY ("id")
);
