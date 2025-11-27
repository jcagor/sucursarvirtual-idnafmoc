-- CreateTable
CREATE TABLE "GrowthPlanReport" (
    "id" UUID NOT NULL,
    "pillar_id" UUID NOT NULL,
    "pillar_indicator" TEXT,
    "data_source" TEXT,
    "base_line" DOUBLE PRECISION,
    "pillar_proposed_goal" DOUBLE PRECISION,
    "month_one_goal" DOUBLE PRECISION,
    "month_one_real" DOUBLE PRECISION,
    "month_two_goal" DOUBLE PRECISION,
    "month_two_real" DOUBLE PRECISION,
    "month_three_goal" DOUBLE PRECISION,
    "month_three_real" DOUBLE PRECISION,
    "month_four_goal" DOUBLE PRECISION,
    "month_four_real" DOUBLE PRECISION,
    "month_five_goal" DOUBLE PRECISION,
    "month_five_real" DOUBLE PRECISION,
    "month_six_goal" DOUBLE PRECISION,
    "month_six_real" DOUBLE PRECISION,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),
    "state" BOOLEAN,

    CONSTRAINT "GrowthPlanReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GrowthPlanReport" ADD CONSTRAINT "GrowthPlan_fkey" FOREIGN KEY ("pillar_id") REFERENCES "GrowthPlan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
