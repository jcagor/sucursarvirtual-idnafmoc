-- CreateTable
CREATE TABLE "SelectVacancyOrigin" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "origin" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectVacancyOrigin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectCountryList" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "country" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectCountryList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectLicenseType" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "level" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectLicenseType_pkey" PRIMARY KEY ("id")
);
