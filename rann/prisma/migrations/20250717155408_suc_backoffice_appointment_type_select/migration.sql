-- CreateEnum
CREATE TYPE "AppointmentType" AS ENUM ('CONSULT', 'ANALYSIS', 'WORKSHOP');

-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "type" "AppointmentType" NOT NULL DEFAULT 'CONSULT';

-- CreateTable
CREATE TABLE "SelectAppointmentType" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "type" "AppointmentType" NOT NULL,
    "label" TEXT NOT NULL,
    "state" BOOLEAN,

    CONSTRAINT "SelectAppointmentType_pkey" PRIMARY KEY ("id")
);
