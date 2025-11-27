-- CreateTable
CREATE TABLE "WorkPlan" (
    "id" UUID NOT NULL,
    "businessProfile_id" UUID NOT NULL,
    "workPlan" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkPlan" ADD CONSTRAINT "WorkPlan_businessProfile_id_fkey" FOREIGN KEY ("businessProfile_id") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
