import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear tipos de curso
  const courseType = await prisma.courseType.create({
    data: {
      name: 'Capacitación',
      state: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  });

  // Crear entidad certificadora
  const certificationEntity = await prisma.certificationEntity.create({
    data: {
      name: 'Comfandi',
      state: 'ACTIVE',
      created_at: new Date(),
      updated_at: new Date()
    }
  });

  // Crear línea de formación
  const formationLine = await prisma.formationLine.create({
    data: {
      name: 'Desarrollo Personal',
      state: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  });

  // Crear frecuencia de oferta
  const offerFrequency = await prisma.offerFrequency.create({
    data: {
      name: 'Mensual',
      state: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  });

  // Crear región
  const region = await prisma.region.create({
    data: {
      name: 'Valle del Cauca',
      state: true,
      created_at: new Date(),
      updated_at: new Date()
    }
  });

  // Crear cursos de entrenamiento
  const courses = [
    {
      name: 'Liderazgo y Trabajo en Equipo',
      duration_hours: 40,
      minimum_inscribed: 10,
      maximum_inscribed: 30,
      target_population: 'Trabajadores activos',
      observation: 'Curso presencial',
      course_schedule: 'Lunes a Viernes 6:00 PM - 9:00 PM',
      start_date: new Date('2024-06-01'),
      course_type: courseType.id,
      certification_entity: certificationEntity.id,
      formation_line: formationLine.id,
      offer_frequency: offerFrequency.id,
      region: region.id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Comunicación Efectiva',
      duration_hours: 30,
      minimum_inscribed: 8,
      maximum_inscribed: 25,
      target_population: 'Trabajadores activos',
      observation: 'Curso virtual',
      course_schedule: 'Sábados 9:00 AM - 1:00 PM',
      start_date: new Date('2024-06-15'),
      course_type: courseType.id,
      certification_entity: certificationEntity.id,
      formation_line: formationLine.id,
      offer_frequency: offerFrequency.id,
      region: region.id,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      name: 'Gestión del Tiempo',
      duration_hours: 20,
      minimum_inscribed: 5,
      maximum_inscribed: 20,
      target_population: 'Trabajadores activos',
      observation: 'Curso híbrido',
      course_schedule: 'Martes y Jueves 7:00 PM - 9:00 PM',
      start_date: new Date('2024-07-01'),
      course_type: courseType.id,
      certification_entity: certificationEntity.id,
      formation_line: formationLine.id,
      offer_frequency: offerFrequency.id,
      region: region.id,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];

  for (const course of courses) {
    await prisma.trainingCourse.create({
      data: course
    });
  }

  // Crear tipo de documento si no existe
  const documentType = await prisma.document_Type.upsert({
    where: { id: 'cc' },
    update: {},
    create: {
      id: 'cc',
      name: 'CC',
    },
  });

  // Crear curso si no existe
  const course = await prisma.course.upsert({
    where: { id: 'curso-entrenamiento' },
    update: {},
    create: {
      id: 'curso-entrenamiento',
      name: 'Curso de Entrenamiento',
      description: 'Curso de entrenamiento para usuarios',
      iconUrl: '/img/course_default.png',
    },
  });

  // Crear horario del curso
  const courseSchedule = await prisma.courseSchedule.upsert({
    where: { id: 'horario-2024' },
    update: {},
    create: {
      id: 'horario-2024',
      course_id: course.id,
      name: 'Horario 2024',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-03-31'),
      modality: 'Virtual',
      typeUser: 'Beneficiario',
      sessions: '10',
    },
  });

  // Crear registro de curso
  await prisma.courseRegistration.upsert({
    where: { id: 'registro-curso' },
    update: {},
    create: {
      id: 'registro-curso',
      courseSchedule_id: courseSchedule.id,
      document_number: '1116273861',
      document_type_id: documentType.id,
    },
  });

  console.log('Seed completado exitosamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 