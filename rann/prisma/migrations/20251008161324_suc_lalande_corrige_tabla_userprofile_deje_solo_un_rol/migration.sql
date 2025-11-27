/*
  Warnings:

  - The values [ADMIN,CONSULTANT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('administrador_pymes', 'consultor_pymes', 'analista_pymes', 'administrador_activos', 'administrador_general');
ALTER TABLE "UserProfile" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DATA TYPE "Role";
