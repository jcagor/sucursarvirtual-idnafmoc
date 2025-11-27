
-- CreateTable
CREATE TABLE "CodeCIIU" (
    "id" UUID NOT NULL,
    "code" INTEGER NOT NULL,
    "sector_id" UUID NOT NULL,

    CONSTRAINT "CodeCIIU_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CodeCIIU" ADD CONSTRAINT "CodeCIIU_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
