-- CreateTable
CREATE TABLE "SelectGender" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "gender" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectGender_pkey" PRIMARY KEY ("id")
);
