/*
  Warnings:

  - You are about to drop the column `years_of_constitution` on the `Program` table. All the data in the column will be lost.

*/

-- Borra tabla CodeCIIU
DELETE FROM public."CodeCIIU";

-- Borra Programa de productividad estratégica
DELETE FROM public."Program" WHERE name = 'Programa de productividad estratégica';

-- DropForeignKey
ALTER TABLE "CodeCIIU" DROP CONSTRAINT "CodeCIIU_sector_id_fkey";

-- AlterTable
ALTER TABLE "CodeCIIU" ADD COLUMN     "economic_activity" TEXT,
ADD COLUMN     "valid_economic_activity" BOOLEAN,
ALTER COLUMN "sector_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "years_of_constitution",
ADD COLUMN     "months_of_constitution" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "CodeCIIU" ADD CONSTRAINT "CodeCIIU_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE SET NULL ON UPDATE CASCADE;
