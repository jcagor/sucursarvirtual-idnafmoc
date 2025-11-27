INSERT INTO public.course(

  id, name, description, "iconUrl", "createdAt", "updatedAt")

VALUES

  (gen_random_uuid(),

  'Cultura de innovación',

  'Este programa está diseñado para fortalecer las habilidades blandas y fomentar una mentalidad innovadora en los participantes. A través de diversas herramientas y metodologías, se busca impulsar una cultura de innovación dentro de los equipos y organizaciones, promoviendo el desarrollo personal y profesional.',

  '/icons/workshop.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.course(

  id, name, description, "iconUrl", "createdAt", "updatedAt")

VALUES

  (gen_random_uuid(),

  'Líderes del cambio',

  'El curso Líderes del Cambio de Comfandi está diseñado para potenciar las capacidades de liderazgo de personas que desean generar transformaciones positivas en sus entornos laborales, comunitarios o personales. A través de metodologías participativas y reflexivas, los participantes desarrollarán habilidades para adaptarse al cambio, gestionar equipos, comunicar de forma efectiva y fomentar culturas organizacionales resilientes.',

  '/icons/stock-growth-chart.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.course(

  id, name, description, "iconUrl", "createdAt", "updatedAt")

VALUES

  (gen_random_uuid(),

  'Responsabilidad social empresarial',

  'El curso de Responsabilidad Social Empresarial (RSE) de Comfandi busca fortalecer en las organizaciones una visión estratégica que integre el impacto social, ambiental y económico en sus operaciones. Está orientado a directivos, colaboradores y líderes que desean promover prácticas sostenibles y responsables que generen valor compartido para la empresa y la comunidad.',

  '/icons/brief-icon.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public."courseSchedule"(

  id, name, modality, "createdAt", "updatedAt", course_id, "typeUser",

  "startDate", "endDate", sessions, supplier, description, state,

  "accessType", cost, id_regional)

VALUES (

  gen_random_uuid(),

  'Cultura de innovación',

  'Virtual',

  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,

  (SELECT id FROM public.course WHERE name = 'Cultura de innovación'),

  'Trabajador activo',

  to_date('4/11/2025','DD/MM/YYYY')::timestamp,

  to_date('14/12/2025','DD/MM/YYYY')::timestamp,

  0,

  'Desarrollo empresarial',

  'Prueba carga masiva cronogramas',

  'Created',

  'CLOSED',

  100000,

  1

);

-- Cultura de innovación | Presencial | Abierto | Regional 2

INSERT INTO public."courseSchedule"(

  id, name, modality, "createdAt", "updatedAt", course_id, "typeUser",

  "startDate", "endDate", sessions, supplier, description, state,

  "accessType", cost, id_regional)

VALUES (

  gen_random_uuid(),

  'Cultura de innovación',

  'Presencial',

  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,

  (SELECT id FROM public.course WHERE name = 'Cultura de innovación'),

  'Trabajador activo',

  to_date('4/11/2025','DD/MM/YYYY')::timestamp,

  to_date('14/12/2025','DD/MM/YYYY')::timestamp,

  0,

  'Desarrollo empresarial',

  'Prueba carga masiva cronogramas',

  'Created',

  'OPEN',

  100000,

  2

);

-- Líderes del cambio | Presencial | Abierto | Regional 1

INSERT INTO public."courseSchedule"(

  id, name, modality, "createdAt", "updatedAt", course_id, "typeUser",

  "startDate", "endDate", sessions, supplier, description, state,

  "accessType", cost, id_regional)

VALUES (

  gen_random_uuid(),

  'Cultura de innovación',

  'Presencial',

  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,

  (SELECT id FROM public.course WHERE name = 'Líderes del cambio'),

  'Trabajador activo',

  to_date('5/11/2025','DD/MM/YYYY')::timestamp,

  to_date('28/11/2025','DD/MM/YYYY')::timestamp,

  0,

  'Desarrollo empresarial',

  'Prueba carga masiva cronogramas',

  'Created',

  'OPEN',

  1500000,

  1

);

-- Líderes del cambio | Presencial | Cerrado | Regional 1

INSERT INTO public."courseSchedule"(

  id, name, modality, "createdAt", "updatedAt", course_id, "typeUser",

  "startDate", "endDate", sessions, supplier, description, state,

  "accessType", cost, id_regional)

VALUES (

  gen_random_uuid(),

  'Cultura de innovación',

  'Presencial',

  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,

  (SELECT id FROM public.course WHERE name = 'Líderes del cambio'),

  'Trabajador activo',

  to_date('5/11/2025','DD/MM/YYYY')::timestamp,

  to_date('28/11/2025','DD/MM/YYYY')::timestamp,

  0,

  'Desarrollo empresarial',

  'Prueba carga masiva cronogramas',

  'Created',

  'CLOSED',

  1500000,

  1

);

-- Responsabilidad social empresarial | Presencial | Abierto | Regional 2

INSERT INTO public."courseSchedule"(

  id, name, modality, "createdAt", "updatedAt", course_id, "typeUser",

  "startDate", "endDate", sessions, supplier, description, state,

  "accessType", cost, id_regional)

VALUES (

  gen_random_uuid(),

  'Cultura de innovación',

  'Presencial',

  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,

  (SELECT id FROM public.course WHERE name = 'Responsabilidad social empresarial'),

  'Trabajador activo',

  to_date('6/11/2025','DD/MM/YYYY')::timestamp,

  to_date('29/11/2025','DD/MM/YYYY')::timestamp,

  0,

  'Desarrollo empresarial',

  'Prueba carga masiva cronogramas',

  'Created',

  'OPEN',

  1500000,

  2

);

-- Responsabilidad social empresarial | Presencial | Cerrado | Regional 1

INSERT INTO public."courseSchedule"(

  id, name, modality, "createdAt", "updatedAt", course_id, "typeUser",

  "startDate", "endDate", sessions, supplier, description, state,

  "accessType", cost, id_regional)

VALUES (

  gen_random_uuid(),

  'Cultura de innovación',

  'Presencial',

  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,

  (SELECT id FROM public.course WHERE name = 'Responsabilidad social empresarial'),

  'Trabajador activo',

  to_date('7/11/2025','DD/MM/YYYY')::timestamp,

  to_date('30/11/2025','DD/MM/YYYY')::timestamp,

  0,

  'Desarrollo empresarial',

  'Prueba carga masiva cronogramas',

  'Created',

  'CLOSED',

  1500000,

  1

);