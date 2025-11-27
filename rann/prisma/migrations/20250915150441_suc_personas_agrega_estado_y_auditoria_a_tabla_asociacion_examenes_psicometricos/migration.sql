/*
  Warnings:

  - Added the required column `updated_at` to the `PsyTestGroupAssignation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PsyTestGroupAssignationStatus" AS ENUM ('PENDING', 'INPROGRESS', 'FINALIZED');

-- AlterTable
ALTER TABLE "PsyTestGroupAssignation" ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "current_status" "PsyTestGroupAssignationStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "state" BOOLEAN,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL;
