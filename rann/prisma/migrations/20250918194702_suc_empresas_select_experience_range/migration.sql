-- CreateTable
CREATE TABLE "SelectExperienceRange" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "range" TEXT NOT NULL,
    "state" BOOLEAN,

    CONSTRAINT "SelectExperienceRange_pkey" PRIMARY KEY ("id")
);
