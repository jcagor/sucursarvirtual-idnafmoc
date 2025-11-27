-- CreateTable
CREATE TABLE "GrowthPlan" (
    "id" UUID NOT NULL,
    "businessProfile_id" UUID NOT NULL,
    "growthPlan" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrowthPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GrowthPlan" ADD CONSTRAINT "GrowthPlan_businessProfile_id_fkey" FOREIGN KEY ("businessProfile_id") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
