-- CreateEnum
CREATE TYPE "AssignationOperation" AS ENUM ('ASSIGN', 'REMOVE');

-- CreateTable
CREATE TABLE "BusinessAdminUserAssignationHistory" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "identification_type" TEXT NOT NULL,
    "identification_number" TEXT NOT NULL,
    "business_nit" TEXT NOT NULL,
    "operation" "AssignationOperation" NOT NULL,
    "user_id" TEXT NOT NULL,
    "business_id" UUID NOT NULL,
    "additional_info" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" BOOLEAN,

    CONSTRAINT "BusinessAdminUserAssignationHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessAdminUserAssignationHistory" ADD CONSTRAINT "BusinessAdminUserAssignationHistory_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAdminUserAssignationHistory" ADD CONSTRAINT "BusinessAdminUserAssignationHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
