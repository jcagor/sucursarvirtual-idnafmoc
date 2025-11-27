-- CreateTable
CREATE TABLE "SelectAttentionPoint" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "attention_point" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectAttentionPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectBusinessType" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "type" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectBusinessType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectDisabilityType" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "disability" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectDisabilityType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectHiringType" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "type" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectHiringType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectLaboralGestor" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "gestor" TEXT,
    "code" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectLaboralGestor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectSalaryRange" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "range" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectSalaryRange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectVacantReqLanguage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "language" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectVacantReqLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectVehicleType" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "vehicle" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectVehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectWorkDays" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "day" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectWorkDays_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SelectWorkMode" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "mode" TEXT,
    "state" BOOLEAN,

    CONSTRAINT "SelectWorkMode_pkey" PRIMARY KEY ("id")
);
