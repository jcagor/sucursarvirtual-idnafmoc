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
          visibleIf:
            "{grupos_priorizados} contains '♿ Persona con discapacidad'",
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
    {
      name: 'entorno_familiar_comunitario',
      elements: [
        {
          type: 'radiogroup',
          name: 'bienestar_emocional',
          title: '¿Cómo calificarías tu bienestar emocional actual?',
          isRequired: true,
          choices: [
            { value: 'excelente', text: '😊 Excelente' },
            { value: 'bueno', text: '🙂 Bueno' },
            { value: 'regular', text: '😐 Regular' },
            { value: 'dificil', text: '😔 Difícil' },
          ],
        },
        {
          type: 'radiogroup',
          name: 'red_apoyo',
          title: '¿Cuentas con una red de apoyo familiar o comunitaria?',
          isRequired: true,
          choices: [
            {
              value: 'fuerte',
              text: '🎁 Sí, cuento con una red de apoyo fuerte',
            },
            { value: 'limitada', text: '👥 Sí, pero es limitada' },
            { value: 'no_cuenta', text: '🚫 No cuento con red de apoyo' },
          ],
        },
        {
          type: 'text',
          name: 'personas_hogar',
          inputType: 'number',
          title: '¿Cuántas personas viven en tu hogar (incluyéndote)?',
          isRequired: true,
          min: 0,
        },
        {
          type: 'text',
          name: 'menores_a_cargo',
          inputType: 'number',
          title: '¿Tienes menores de edad a tu cargo? Si es así, ¿cuántos?',
          isRequired: true,
          min: 0,
        },
        {
          type: 'comment',
          name: 'actividades',
          title:
            '¿Participas en actividades culturales, deportivas o comunitarias? (Opcional)',
          placeholder:
            'Describe brevemente las actividades en las que participas',
        },
      ],
    },
    {
      name: 'ingresos_tecnologia',
      elements: [
        {
          type: 'radiogroup',
          name: 'ingresos_mensuales',
          title: '¿En qué rango se encuentran tus ingresos mensuales?',
          isRequired: true,
          choices: [
            { value: 'menos_1_smlmv', text: '🪙 Menos de 1 SMMLV' },
            { value: '1_2_smlmv', text: '💰 Entre 1 y 2 SMMLV' },
            { value: '2_4_smlmv', text: '💸 Entre 2 y 4 SMMLV' },
            { value: 'mas_4_smlmv', text: '💎 Más de 4 SMMLV' },
            { value: 'sin_ingresos', text: '⚠️ Sin ingresos actualmente' },
          ],
        },
        {
          type: 'dropdown',
          name: 'personas_dependen',
          title: '¿Cuántas personas dependen económicamente de ti?',
          isRequired: true,
          choices: [
            { value: 0, text: '0' },
            { value: 1, text: '1' },
            { value: 2, text: '2' },
            { value: 3, text: '3' },
            { value: 4, text: '4' },
            { value: 5, text: '5' },
            { value: '6_mas', text: '6 o más' },
          ],
        },
        {
          type: 'radiogroup',
          name: 'dominio_tecnologico',
          title: '¿Cómo calificarías tu dominio de herramientas tecnológicas?',
          isRequired: true,
          choices: [
            {
              value: 'avanzado',
              text: '🧠 Avanzado – Manejo herramientas especializadas',
            },
            {
              value: 'intermedio',
              text: '📱 Intermedio – Uso cotidiano de aplicaciones',
            },
            { value: 'basico', text: '🔋 Básico – Solo funciones esenciales' },
            { value: 'ninguno', text: '⚠️ Ninguno – Requiere apoyo' },
          ],
        },
        {
          type: 'radiogroup',
          name: 'acceso_internet',
          title: '¿Tienes acceso a internet en tu hogar?',
          isRequired: true,
          choices: [
            { value: 'fijo', text: '📶 Sí, internet fijo' },
            { value: 'movil', text: '📱 Sí, solo datos móviles' },
            { value: 'ambos', text: '🔗 Sí, ambos (fijo y móvil)' },
            { value: 'no_internet', text: '🚫 No tengo acceso a internet' },
          ],
        },
        {
          type: 'checkbox',
          name: 'dispositivos_digitales',
          title: '¿Qué dispositivos digitales tienes disponibles?',
          isRequired: true,
          choices: [
            { value: 'celular', text: '📱 Celular' },
            { value: 'tablet', text: '📟 Tablet' },
            { value: 'computador', text: '💻 Computador' },
            { value: 'varios', text: '🔌 Varios' },
            {
              value: 'ninguno',
              text: '🚫 No tengo acceso a dispositivos digitales',
            },
          ],
        },
      ],
    },
    {
      name: 'aspiracion',
      elements: [
        {
          type: 'radiogroup',
          name: 'principal_aspiracion',
          title: '¿Cuál es tu principal aspiración en este momento?',
          description:
            'Selecciona la opción que mejor describa tu situación actual y tus objetivos a corto plazo.',
          isRequired: true,
          choices: [
            {
              value: 'empleo_competencias',
              text: '💼 Encontrar empleo o mejorar mis competencias para acceder a mejores oportunidades laborales',
            },
            {
              value: 'estudiar',
              text: '📚 Quiero estudiar, continuar o iniciar estudios en un área específica',
            },
            {
              value: 'emprendimiento',
              text: '🚀 Tengo un emprendimiento o quiero iniciar uno y necesito herramientas, formación o apoyo',
            },
          ],
        },
      ],
    },
    {
      "name": "ruta_emprendimiento",
      "elements": [
        {
          "type": "radiogroup",
          "name": "etapa_emprendimiento",
          "title": "¿En qué etapa está tu emprendimiento?",
          "isRequired": true,
          "choices": [
            { "value": "idea", "text": "💡 Tengo una idea, pero aún no he empezado" },
            { "value": "iniciando", "text": "🌱 Estoy iniciando (menos de 1 año)" },
            { "value": "funcionando", "text": "📈 Mi negocio ya está funcionando (más de 1 año)" },
            { "value": "consolidado", "text": "🏢 Mi negocio está consolidado y busco crecer" }
          ]
        },
        {
          "type": "dropdown",
          "name": "tiempo_negocio",
          "title": "¿Hace cuánto tiempo tienes tu negocio o idea?",
          "isRequired": true,
          "choices": [
            { "value": "menos_6_meses", "text": "Menos de 6 meses" },
            { "value": "6_12_meses", "text": "Entre 6 meses y 1 año" },
            { "value": "1_3_anos", "text": "Entre 1 y 3 años" },
            { "value": "3_5_anos", "text": "Entre 3 y 5 años" },
            { "value": "mas_5_anos", "text": "Más de 5 años" }
          ]
        },
        {
          "type": "dropdown",
          "name": "sector_negocio",
          "title": "¿A qué sector pertenece tu negocio o idea?",
          "isRequired": true,
          "choices": [
            "Comercio",
            "Servicios",
            "Tecnología",
            "Alimentos",
            "Textil / Moda",
            "Educación",
            "Salud y bienestar",
            "Construcción",
            "Transporte",
            "Turismo",
            "Otro"
          ]
        },
        {
          "type": "comment",
          "name": "descripcion_negocio",
          "title": "Describe brevemente tu negocio o idea de negocio",
          "placeholder": "Ejemplo: Vendo productos de belleza natural, quiero abrir una tienda online de ropa..."
        },
        {
          "type": "radiogroup",
          "name": "formalizacion",
          "title": "¿Tu negocio está formalizado (RUT, registro mercantil)?",
          "isRequired": true,
          "choices": [
            { "value": "formalizado", "text": "✅ Sí, está formalizado" },
            { "value": "proceso", "text": "⏳ Estoy en proceso de formalización" },
            { "value": "informal", "text": "❌ No, es informal" },
            { "value": "no_sabe", "text": "❓ No sé qué significa formalizar" }
          ]
        },
        {
          "type": "text",
          "name": "personas_trabajan",
          "inputType": "number",
          "title": "¿Cuántas personas trabajan en tu negocio (incluido tú)?",
          "isRequired": true,
          "min": 0
        },
        {
          "type": "checkbox",
          "name": "tipo_apoyo",
          "title": "¿Qué tipo de apoyo necesitas para tu emprendimiento? (puedes seleccionar varios)",
          "isRequired": true,
          "choices": [
            { "value": "capacitacion", "text": "📚 Capacitación y formación empresarial" },
            { "value": "financiacion", "text": "💰 Financiamiento o capital" },
            { "value": "asesoria", "text": "🤝 Asesoría técnica o mentoría" },
            { "value": "formalizacion", "text": "📄 Apoyo en formalización" },
            { "value": "marketing", "text": "📢 Estrategias de marketing y ventas" },
            { "value": "herramientas", "text": "🛠️ Herramientas tecnológicas" },
            { "value": "redes_contacto", "text": "🔗 Redes de contacto y alianzas" }
          ]
        },
        {
          "type": "checkbox",
          "name": "temas_capacitacion",
          "title": "¿En qué temas te gustaría capacitarte? (puedes seleccionar varios)",
          "isRequired": true,
          "choices": [
            { "value": "plan_negocios", "text": "📊 Plan de negocios" },
            { "value": "finanzas", "text": "💵 Finanzas y contabilidad" },
            { "value": "marketing_digital", "text": "📱 Marketing digital y redes sociales" },
            { "value": "ventas", "text": "💼 Técnicas de ventas" },
            { "value": "servicio_cliente", "text": "😊 Servicio al cliente" },
            { "value": "productividad", "text": "⏱️ Productividad y gestión del tiempo" },
            { "value": "innovacion", "text": "💡 Innovación y desarrollo de productos" }
          ]
        },
        {
          "type": "radiogroup",
          "name": "financiamiento_interes",
          "title": "¿Te interesaría acceder a financiamiento o créditos para tu negocio?",
          "isRequired": true,
          "choices": [
            { "value": "urgente", "text": "🆘 Sí, lo necesito urgentemente" },
            { "value": "futuro", "text": "📅 Sí, en un futuro cercano" },
            { "value": "no", "text": "❌ No en este momento" },
            { "value": "mas_informacion", "text": "ℹ️ Me gustaría tener más información primero" }
          ]
        }
      ]
    }
  ],
};

export enum CharacterizationSteps {
  BasicInfo = 0,
  BasicInfoAddress = 1,
  IdentificacionPerfilUsuario = 2,
  ConditionPrioritizationVulnerability = 3,
  EntornoFamiliarComunitario = 4,
  IngresosTecnologia = 5,
  Aspiracion = 6,
  RutaEmprendimiento = 7,
}
