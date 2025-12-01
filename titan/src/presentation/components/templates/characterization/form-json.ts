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
    {
      name: 'identificacion_perfil_usuario',
      elements: [
        {
          type: 'radiogroup',
          name: 'situacion_actual',
          title:
            '¿Cuál de las siguientes opciones describe mejor tu situación actual?',
          isRequired: true,
          choices: [
            '📚 Soy estudiante de colegio',
            '💼 Aspirante o estudiante técnico-tecnológico',
            '🎓 Me gradué recientemente',
            '🔎 Estoy buscando empleo',
            '👷 Soy trabajador activo',
            '🚀 Tengo una idea de negocio o emprendimiento en marcha',
            '⭕ Ninguna',
          ],
        },

        /* ============================
            BLOQUE: Soy estudiante de colegio
           ============================ */
        {
          type: 'radiogroup',
          name: 'colegio_estudiante',
          title: '¿En qué colegio estudias?',
          visibleIf: "{situacion_actual} = '📚 Soy estudiante de colegio'",
          isRequired: true,
          choices: ['Colegio Comfandi', 'Otro'],
        },
        {
          type: 'text',
          name: 'colegio_otro_nombre',
          title: 'Nombre del colegio:',
          visibleIf:
            "{situacion_actual} = '📚 Soy estudiante de colegio' and {colegio_estudiante} = 'Otro'",
          isRequired: true,
          placeholder: 'Escribe el nombre del colegio',
        },

        /* ==========================================
            BLOQUE: Aspirante o estudiante técnico-tecnológico
           ========================================== */
        {
          type: 'radiogroup',
          name: 'inst_tecnica',
          title: '¿Dónde estudias o aspiras estudiar?',
          visibleIf:
            "{situacion_actual} = '💼 Aspirante o estudiante técnico-tecnológico'",
          isRequired: true,
          choices: ['Instituto de Educación Comfandi', 'Otro. ¿Cuál?'],
        },
        {
          type: 'text',
          name: 'inst_tecnica_otro',
          title: 'Escribe el nombre de la institución:',
          visibleIf:
            "{situacion_actual} = '💼 Aspirante o estudiante técnico-tecnológico' and {inst_tecnica} = 'Otro. ¿Cuál?'",
          isRequired: true,
          placeholder: 'Nombre de la institución',
        },

        /* ==========================================
            BLOQUE: Estoy buscando empleo
           ========================================== */
        {
          type: 'radiogroup',
          name: 'situacion_empleo',
          title: '¿Cuál es tu situación actual respecto al empleo?',
          visibleIf: "{situacion_actual} = '🔎 Estoy buscando empleo'",
          isRequired: true,
          choices: [
            'Desempleado',
            'Trabajando pero quiero cambiar de empleo',
            'Busco primera experiencia',
          ],
        },
      ],
    },
    {
      name: 'condition_prioritization_vulnerability',
      elements: [
        {
          type: 'checkbox',
          name: 'grupos_priorizados',
          title: '¿Perteneces a algún grupo priorizado o vulnerable?',
          isRequired: true,
          choices: [
            '♿ Persona con discapacidad',
            '👴 Persona mayor',
            '👦 Adolescente o joven',
            '✈ Migrante',
            '🕊 Víctima del conflicto',
            '👧‍👦  Mujer cabeza de hogar',
            '🏳️‍🌈 LGBTIQ+',
            '⭕ Ninguno',
          ],
          colCount: 1,
        },
        {
          type: 'radiogroup',
          name: 'tipo_discapacidad',
          title: 'Selecciona tipo de discapacidad',
          visibleIf: "{grupos_priorizados} contains '♿ Persona con discapacidad'",
          isRequired: true,
          choices: [
            'Física',
            'Visual',
            'Auditiva',
            'Intelectual',
            'Psicosocial',
            'Múltiple',
            'No aplica',
          ],
          colCount: 1,
        },
        {
          type: 'radiogroup',
          name: 'certificado_discapacidad',
          title: '¿Cuentas con documento emitido por IPS certificadora?',
          visibleIf:
            "{grupos_priorizados} contains '♿ Persona con discapacidad' and {tipo_discapacidad} notempty",
          isRequired: true,
          choices: ['Sí', 'No', 'No aplica'],
          colCount: 1,
        },
        {
          type: 'radiogroup',
          name: 'grupo_etnico',
          title: '¿A qué grupo étnico perteneces?',
          isRequired: true,
          choices: [
            'Indígena',
            'Afrodescendiente',
            'Raizal',
            'Palenquero',
            'ROM',
            'Ninguno',
          ],
          colCount: 1,
        },
      ],
      triggers: [
        {
          type: 'setvalue',
          expression: "{grupos_priorizados} contains 'Ninguno'",
          setToName: 'grupos_priorizados',
          value: ['Ninguno'],
        },
      ],
    },
  ],
};
