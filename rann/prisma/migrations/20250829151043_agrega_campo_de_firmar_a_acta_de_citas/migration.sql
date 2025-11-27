-- CreateEnum
CREATE TYPE "signStatusEnum" AS ENUM ('PENDING', 'SIGNED');

-- AlterTable
ALTER TABLE "TechAssistanceRecord" ADD COLUMN     "signStatus" "signStatusEnum" NOT NULL DEFAULT 'PENDING';
