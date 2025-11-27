-- CreateTable
CREATE TABLE "Program" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

INSERT INTO "Program" ("id", "name", "updatedAt") VALUES
(gen_random_uuid(), 'Programa productividad operacional', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Programa de productividad estratégica',  CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Programa de sostenibilidad',  CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Programa de Sofisticación de producto/servicio',  CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Programa de Alistamiento Inversión de impacto / Financing Match',  CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Programa de EmprendeTech / Agrifoodtech',  CURRENT_TIMESTAMP);
