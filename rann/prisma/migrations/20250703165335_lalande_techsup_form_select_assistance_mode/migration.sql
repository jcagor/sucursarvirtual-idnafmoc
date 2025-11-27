-- CreateTable
CREATE TABLE "SelectAssistanceMode" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "mode" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectAssistanceMode_pkey" PRIMARY KEY ("id")
);
