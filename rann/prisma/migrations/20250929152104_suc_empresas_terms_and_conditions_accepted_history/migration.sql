-- CreateTable
CREATE TABLE "UserTermsAcceptedHistory" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "identification_number" TEXT NOT NULL,
    "identification_type" TEXT NOT NULL,
    "terms_conditions_accepted" BOOLEAN NOT NULL,
    "additional_info" JSONB,
    "state" BOOLEAN,

    CONSTRAINT "UserTermsAcceptedHistory_pkey" PRIMARY KEY ("id")
);
