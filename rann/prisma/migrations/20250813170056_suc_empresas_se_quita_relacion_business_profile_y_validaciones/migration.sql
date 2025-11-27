/*
  Warnings:

  - You are about to drop the column `businessProfile_id` on the `BusinessValidation` table. All the data in the column will be lost.
  - Added the required column `document_number` to the `BusinessValidation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_type_id` to the `BusinessValidation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessValidation" DROP CONSTRAINT "BusinessValidation_businessProfile_id_fkey";

-- AlterTable
ALTER TABLE "BusinessValidation" DROP COLUMN "businessProfile_id",
ADD COLUMN     "document_number" TEXT NOT NULL,
ADD COLUMN     "document_type_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "BusinessValidation" ADD CONSTRAINT "BusinessValidation_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "Document_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
