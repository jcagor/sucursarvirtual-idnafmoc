-- CreateEnum
CREATE TYPE "BusinessValidationStatus" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "BusinessValidation" (
    "id" UUID NOT NULL,
    "businessProfile_id" UUID NOT NULL,
    "reason" TEXT[],
    "status" "BusinessValidationStatus" NOT NULL,
    "validatedAt" DATE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessValidation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessValidation" ADD CONSTRAINT "BusinessValidation_businessProfile_id_fkey" FOREIGN KEY ("businessProfile_id") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
