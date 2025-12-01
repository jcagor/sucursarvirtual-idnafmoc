export const characterizationFormJson = {
  showQuestionNumbers: 'off',
  showPrevButton: false,
  showNextButton: false,
  questionsOrder: 'row',
  pageNextText: '',
  pagePrevText: '',
  widthMode: 'static',
  fitWidth: true,
  pages: [
    {
      name: 'basic_info',
      questionsLayout: 'table',
      colCount: 2,
      elements: [
        {
          type: 'text',
          name: 'full_name',
          title: 'Nombre completo',
          isRequired: true,
          maxLength: 50,
          placeholder: 'Ingresa tu nombre',
          validators: [
            {
              type: 'regex',
              regex: '^(?!\\s+$).+',
              text: 'El nombre no puede ser solo espacios.',
            },
          ],
        },

        {
          type: 'dropdown',
          name: 'doc_type',
          title: 'Tipo de documento de identidad',
          isRequired: true,
          choices: [
            'Registro civil',
            'Tarjeta de identidad',
            'Cédula de ciudadanía',
            'Cédula de extranjería',
            'PPT',
            'Pasaporte',
            'Documento de identificación extranjero',
            'No tiene documento',
          ],
        },

        {
          type: 'text',
          name: 'doc_number',
          title: 'Número de documento de identidad',
          maxLength: 12,
          placeholder: 'Ingresa tu número',
          visibleIf: "{doc_type} != 'No tiene documento'",
          isRequired: true,
          validators: [
            {
              type: 'regex',
              regex: '^[A-Za-z0-9]*$',
              text: 'Solo se permiten números o caracteres alfanuméricos.',
            },
          ],
        },

        {
          type: 'text',
          inputType: 'date',
          name: 'birth_date',
          title: 'Fecha de nacimiento',
          isRequired: true,
          max: 'today',
        },

        {
          type: 'dropdown',
          name: 'gender',
          title: 'Identidad de género',
          isRequired: true,
          choices: [
            'Mujer',
            'Hombre',
            'Persona transgénero',
            'Persona no binaria',
            'Prefiero no responder',
            'Otra',
          ],
        },

        {
          type: 'text',
          name: 'gender_other',
          title: 'Escribir su identidad',
          maxLength: 30,
          visibleIf: "{gender} = 'Otra'",
        },
      ],
    },
    {
      name: 'basic_info_address',
      questionsLayout: 'table',
      colCount: 2,
      elements: [
        {
          type: 'dropdown',
          name: 'municipality',
          title: 'Municipio de residencia actual',
          isRequired: true,
          choices: [
            'Cali',
            'Palmira',
            'Yumbo',
            'Jamundí',
            'Tuluá',
            'Buga',
            'Cartago',
            'Buenaventura',
            'Otro',
          ],
        },

        {
          type: 'text',
          name: 'municipality_other',
          title: 'Escribir municipio y país',
          visibleIf: "{municipality} = 'Otro'",
          isRequired: true,
        },

        {
          type: 'dropdown',
          name: 'education_level',
          title: 'Nivel educativo actual',
          isRequired: true,
          choices: [
            'Ninguna',
            'Básica primaria',
            'Básica secundaria',
            'Bachiller',
            'Técnico laboral',
            'Técnico profesional',
            'Tecnólogo',
            'Universitario',
            'Especialización',
            'Magíster',
            'Doctorado',
            'Estudios en el extranjero',
          ],
        },

        {
          type: 'dropdown',
          name: 'education_status',
          title: 'Estado del nivel académico',
          isRequired: true,
          choices: [
            'Finalizado',
            'En curso',
            'Suspendido',
            'Retirado temporalmente',
          ],
        },

        {
          type: 'text',
          name: 'education_semester',
          title: 'Semestre o año cursado',
          visibleIf: "{education_status} = 'En curso'",
        },
      ],
    },
  ],
};
