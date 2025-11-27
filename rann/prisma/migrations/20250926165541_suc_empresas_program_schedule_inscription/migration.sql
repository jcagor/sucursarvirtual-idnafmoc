-- CreateTable
CREATE TABLE "_BusinessProgramInscription" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_BusinessProgramInscription_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BusinessProgramInscription_B_index" ON "_BusinessProgramInscription"("B");

-- AddForeignKey
ALTER TABLE "_BusinessProgramInscription" ADD CONSTRAINT "_BusinessProgramInscription_A_fkey" FOREIGN KEY ("A") REFERENCES "BusinessProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessProgramInscription" ADD CONSTRAINT "_BusinessProgramInscription_B_fkey" FOREIGN KEY ("B") REFERENCES "programSchedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
