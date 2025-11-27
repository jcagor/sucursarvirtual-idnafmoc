-- CreateTable
CREATE TABLE "Department" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subsector" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "sector_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subsector_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subsector" ADD CONSTRAINT "Subsector_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "Sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddDepartment
INSERT INTO "Department" ("id", "name", "updatedAt") VALUES
(gen_random_uuid(), 'Amazonas', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Antioquía', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Arauca', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Atlántico', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Bolíva', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Boyacá', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Caldas', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Caquetá', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Casanare', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Cauca', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Cesar', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Chocó', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Córdoba', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Cundinamarca', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Guainía', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Guaviare', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Huila', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'La Guajira', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Magdalena', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Meta', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Nariño', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Norte de Santander', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Putumayo', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Quindío', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Risaralda', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'San Andrés y Providencia', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Santander', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Sucre', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Tolima', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Valle del Cauca', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Vaupés', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Vichada', CURRENT_TIMESTAMP);

-- AddCity
INSERT INTO "City" ("id", "name", "updatedAt") VALUES
(gen_random_uuid(), 'Armenia', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Barranquilla', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Bogotá', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Bucaramanga', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Cali', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Cartagena', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Cúcuta', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Ibagué', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Manizales', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Medellín', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Pereira', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Santa Marta', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Villavicencio', CURRENT_TIMESTAMP);

-- AddSector
INSERT INTO "Sector" ("id", "name", "updatedAt") VALUES
(gen_random_uuid(), 'Sector Comercio', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Sector Manufacturero', CURRENT_TIMESTAMP),
(gen_random_uuid(), 'Sector Servicios', CURRENT_TIMESTAMP);

