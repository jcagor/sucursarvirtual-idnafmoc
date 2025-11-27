-- CreateTable
CREATE TABLE "SelectMunicipality" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "state" BOOLEAN,

    CONSTRAINT "SelectMunicipality_pkey" PRIMARY KEY ("id")
);
