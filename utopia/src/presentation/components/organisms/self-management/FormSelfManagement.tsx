"use client";
import { MainTitle } from "@comfanditd/chronux-ui";
import { Button, SectionSeparator } from "presentation";
import "survey-core/defaultV2.min.css";
import { Model, surveyLocalization } from "survey-core";
import { Survey } from "survey-react-ui";
import CreateSelfManagementUseCase from "domain/usecases/SelfManagement/createSelfManagement.use.case";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ModalTitle } from "presentation/components/atoms/common/modals/text/ModalTitle";
import { useState } from "react";
import GetAnalisysUseCase from "domain/usecases/SelfManagement/getAnalisys.use.case";
import { useDispatch } from "react-redux";
import { addAlert } from "presentation/store/slices/alertSlice";
import { generatePDF } from "presentation/components/atoms/common/PDF/generatePDF";
import SelfManagementAnalisisPDF from "../self-management-results/SelfManagementAnalisisPDF";
import SendSelfManagementToMailUseCase from "domain/usecases/SelfManagement/sendSelfManagementToMail.use.case";

surveyLocalization.currentLocale = "es";
surveyLocalization.locales["es"] = {
  pageNextText: "Siguiente",
  pagePrevText: "Anterior",
  completeText: "Completar",
  progressText: "Página {0} de {1}",
  questionsProgressText: "Preguntas respondidas: {0}/{1}",
};

const surveyJson = {
  logoPosition: "right",
  showProgressBar: "top",
  progressBarType: "questions",
  pages: [
    {
      name: "page1",
      title: "Estratégica",
      elements: [
        {
          type: "radiogroup",
          name: "question1",
          title:
            "¿Realizan ejercicios de planeación estratégica donde definen sus metas a corto, mediano y largo plazo?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question2",
          title:
            "¿Tienen implementado indicadores para medir, evaluar y hacer seguimiento los resultados de la gestión en los diferentes niveles de la empresa: Estratégico, táctico y operativo?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question3",
          title:
            "¿Realizan seguimiento periodico para analizar los resultados de la gestión en los diferentes procesos de la empresa?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question4",
          title:
            "¿Han definido el modelo de negocio con una propuesta de valor, que le permita tener una ventaja competitiva dentro del mercado?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question5",
          title:
            "¿Han realizado un análisis de las debilidades, oportunidades, fortalezas y amenazas de la empresa para incorporarlas a la estrategía?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "paneldynamic",
          name: "identified_opportunities_1",
          title: "Oportunidades identificadas (opcional):",
          description:
            "Para esta línea de intervención relacione una situación, proceso o resultado que quisiera mejorar dentro de su empresa.",
          renderMode: "list",
          templateTitle: "Oportunidad #{panelIndex}",
          panelAddText: "Agregar otra oportunidad",
          panelRemoveText: "Eliminar",
          minPanelCount: 1,
          maxPanelCount: 5,
          templateElements: [
            {
              type: "text",
              name: "opportunity_text",
              title: "Descripción de la oportunidad",
              maxLength: 200,
            },
          ],
        },
      ],
    },
    {
      name: "page2",
      title: "Financiera",
      elements: [
        {
          type: "radiogroup",
          name: "question6",
          title:
            "¿La empresa cuenta con un sistema contable donde se registren los movimientos financieros?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question7",
          title:
            "¿Realiza presupuestos de ingresos, costos, gastos y hace seguimiento al cumplimiento de acuerdo al periodo establecido?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question8",
          title:
            "¿Cuenta con una metodología para definir costos, márgenes de contribución y precios por producto o servicio?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question9",
          title:
            "¿Realizan análisis financiero identificando las necesidades de flujo de caja y capital de trabajo requeridos para la operación de la empresa?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question10",
          title:
            "¿Hace seguimiento a la gestión financiera, incluyendo análisis de indicadores de resultados financieros?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "paneldynamic",
          name: "identified_opportunities_2",
          title: "Oportunidades identificadas (opcional):",
          description:
            "Para esta línea de intervención relacione una situación, proceso o resultado que quisiera mejorar dentro de su empresa.",
          renderMode: "list",
          templateTitle: "Oportunidad #{panelIndex}",
          panelAddText: "Agregar otra oportunidad",
          panelRemoveText: "Eliminar",
          minPanelCount: 1,
          maxPanelCount: 5,
          templateElements: [
            {
              type: "text",
              name: "opportunity_text",
              title: "Descripción de la oportunidad",
              maxLength: 200,
            },
          ],
        },
      ],
    },
    {
      name: "page3",
      title: "Comercial y mercadeo",
      elements: [
        {
          type: "radiogroup",
          name: "question11",
          title:
            "¿la empresa ha implementado algún sistema que le permita gestionar las necesidades y relacionamiento con los clientes de acuerdo a los segmentos de mercado?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question12",
          title:
            "¿La empresa tiene procesos definidos para gestionar las solicitudes, quejas, reclamos y/o sugerencias de los clientes?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question13",
          title:
            "¿Realiza un plan estratégico de mercadeo y hace seguimiento periódico a los resultados?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question14",
          title:
            "¿Cuenta con una fuerza comercial para el cumplimiento de las metas definidas por la empresa?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question15",
          title:
            "¿La empresa tiene establecidos indicadores de seguimiento para validar el impacto y resultado de la estrategias comerciales?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "paneldynamic",
          name: "identified_opportunities_3",
          title: "Oportunidades identificadas (opcional):",
          description:
            "Para esta línea de intervención relacione una situación, proceso o resultado que quisiera mejorar dentro de su empresa.",
          renderMode: "list",
          templateTitle: "Oportunidad #{panelIndex}",
          panelAddText: "Agregar otra oportunidad",
          panelRemoveText: "Eliminar",
          minPanelCount: 1,
          maxPanelCount: 5,
          templateElements: [
            {
              type: "text",
              name: "opportunity_text",
              title: "Descripción de la oportunidad",
              maxLength: 200,
            },
          ],
        },
      ],
    },
    {
      name: "page4",
      title: "Talento Humano\n",
      elements: [
        {
          type: "radiogroup",
          name: "question16",
          title:
            "¿Tiene definido el proceso de talento humano (atracción, selección, contratación, evaluación de personal y nómina)? ",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question17",
          title:
            "¿La empresa tiene estrategías efectivas para atraer y retener el talento humano?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question18",
          title:
            "¿Ha definido las competencias específicas de cada cargo, de acuerdo con las necesidades de contratación para los procesos de la empresa?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question19",
          title:
            "¿Tiene implementado un plan de compensación y reconocimiento para los empleados?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question20",
          title:
            "¿Implementa acciones para impulsar el bienestar y desarrollo personal y profesional en los equipos de trabajo?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "paneldynamic",
          name: "identified_opportunities_4",
          title: "Oportunidades identificadas (opcional):",
          description:
            "Para esta línea de intervención relacione una situación, proceso o resultado que quisiera mejorar dentro de su empresa.",
          renderMode: "list",
          templateTitle: "Oportunidad #{panelIndex}",
          panelAddText: "Agregar otra oportunidad",
          panelRemoveText: "Eliminar",
          minPanelCount: 1,
          maxPanelCount: 5,
          templateElements: [
            {
              type: "text",
              name: "opportunity_text",
              title: "Descripción de la oportunidad",
              maxLength: 200,
            },
          ],
        },
      ],
    },
    {
      name: "page5",
      title: "Operacional",
      elements: [
        {
          type: "radiogroup",
          name: "question21",
          title:
            "¿Tiene definidos los procesos operativos, con indicadores para hacer seguimiento al desempeño?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question22",
          title:
            "¿Realiza seguimiento a los resultados de las mediciones de la eficiencia en los procesos operativos y define planes de mejoramiento?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question23",
          title:
            "¿Cuenta con un sistema de gestión de la información para medir los resultados de sus procesos operativos?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question24",
          title:
            "¿Tiene implementadas metodologías para planear la demanda de productos y/o servicios?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question25",
          title:
            "¿Gestiona la compra de bienes y/o servicios enfocándose en la optimización de los recursos teniendo en cuenta la calidad de los mismos?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "paneldynamic",
          name: "identified_opportunities_5",
          title: "Oportunidades identificadas (opcional):",
          description:
            "Para esta línea de intervención relacione una situación, proceso o resultado que quisiera mejorar dentro de su empresa.",
          renderMode: "list",
          templateTitle: "Oportunidad #{panelIndex}",
          panelAddText: "Agregar otra oportunidad",
          panelRemoveText: "Eliminar",
          minPanelCount: 1,
          maxPanelCount: 5,
          templateElements: [
            {
              type: "text",
              name: "opportunity_text",
              title: "Descripción de la oportunidad",
              maxLength: 200,
            },
          ],
        },
      ],
    },
    {
      name: "page6",
      title: "Innovación",
      elements: [
        {
          type: "radiogroup",
          name: "question26",
          title:
            "¿Implementa alguna metodología para la evaluación de ideas innovadoras que conduzcan al mejoramiento de los productos/servicios o procesos?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question27",
          title:
            "¿La empresa ha desarrollado productos o servicios con características innovadoras y diferenciadoras con respecto a la competencia?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question28",
          title:
            "¿Cuenta con canales apropiados para recibir sugerencias, mejoras o recomendaciones de los clientes sobre los productos y servicios?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question29",
          title:
            "¿La empresa ha implementado procesos de transformación digital que impacten de manera positiva la oferta de productos/servicios o procesos?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "question30",
          title:
            "¿Ha implementado herramientas de inteligencia artificial (IA) o de aprendizaje automático (Machine Learning) para agilizar procesos y/o mejorar la prestación de servicios?",
          isRequired: true,
          choices: [
            {
              value: "Nivel Básico",
              text: "Nivel Básico",
            },
            {
              value: "En Desarrollo",
              text: "En Desarrollo",
            },
            {
              value: "Estructurado",
              text: "Estructurado",
            },
            {
              value: "Implementando",
              text: "Implementando",
            },
            {
              value: "Optimizando",
              text: "Optimizando",
            },
          ],
        },
        {
          type: "paneldynamic",
          name: "identified_opportunities_6",
          title: "Oportunidades identificadas (opcional):",
          description:
            "Para esta línea de intervención relacione una situación, proceso o resultado que quisiera mejorar dentro de su empresa.",
          renderMode: "list",
          templateTitle: "Oportunidad #{panelIndex}",
          panelAddText: "Agregar otra oportunidad",
          panelRemoveText: "Eliminar",
          minPanelCount: 1,
          maxPanelCount: 5,
          templateElements: [
            {
              type: "text",
              name: "opportunity_text",
              title: "Descripción de la oportunidad",
              maxLength: 200,
            },
          ],
        },
      ],
    },
  ],
};

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const FormSelfManagement: React.FC<CurrentFormProps> = ({
  setCurrentForm,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const survey = new Model(surveyJson);

  const sendSelfManagementResultsPDF = async () => {
    const getAnalysis = appContainer.get<GetAnalisysUseCase>(
      USECASES_TYPES._GetAnalisysSelfManagement
    );
    const dataSelfManagementAnalisys = await getAnalysis.execute(
      session?.access_token
    );

    if (!dataSelfManagementAnalisys) {
      dispatch(
        addAlert({
          message:
            "Ocurrio un error al enviar el reporte de autodiagnóstico al correo",
          type: "error",
        })
      );
      return;
    }

    const file = await generatePDF({
      TemplatePDF: SelfManagementAnalisisPDF,
      propsTemplatePDF: { AnalisysSelfManagemen: dataSelfManagementAnalisys },
      namePDF: "Autodiagnóstico.pdf",
      showLoadingModal: true,
      dispatch: dispatch,
    });

    if (!file) {
      dispatch(
        addAlert({
          message:
            "Ocurrio un error al enviar el reporte de autodiagnóstico al correo",
          type: "error",
        })
      );
      return;
    }

    const sendSelfManagement =
      appContainer.get<SendSelfManagementToMailUseCase>(
        USECASES_TYPES._SendSelfManagementToMail
      );
    const response = await sendSelfManagement.execute(file);
  };

  const handleSubmit = async () => {
    setOpenModal(true);
    setIsLoading(true);

    const createSelfManagement = appContainer.get<CreateSelfManagementUseCase>(
      USECASES_TYPES._CreateSelfManagement
    );

    const response = await createSelfManagement.execute(
      survey.data,
      session?.access_token
    );

    setIsLoading(false);

    if (!response) {
      setOpenModal(false);
      return;
    }

    await sendSelfManagementResultsPDF();

    setSuccess(true);
  };

  return (
    <div className="w-full h-full items-center flex flex-col">
      <form className="flex flex-col w-full xl:w-10/12">
        <MainTitle text="Autodiagnóstico" className="mb-6" />
        <div className="w-full">
          <Survey model={survey} onComplete={handleSubmit} />
        </div>
      </form>
      {openModal && (
        <Modal
          onClose={() => {
            setOpenModal(false);
            setSuccess(false);
            setIsLoading(false);
          }}
          className="md:w-[463px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-principal-180 transition-all duration-500" />
              <div className="text-principal-180 mt-2">Cargando...</div>
            </>
          ) : success ? (
            <>
              <Image
                src="/utopia/icons/check_ok.svg"
                alt="Success icon"
                width={80}
                height={80}
                className="cursor-pointer"
                priority
              />
              <ModalTitle
                text="¡Información registrada con éxito!"
                className="mt-2"
              />
              <div className="text-principal-450 text-center text-lg">
                Nuestro equipo se pondrá en contacto contigo para dar inicio al
                proceso de consultoría, te invitamos a conocer tus resultados.
              </div>
              <div className="flex flex-col w-[70%] space-y-3 py-2">
                <Button
                  label="Continuar"
                  onClick={() => {
                    setSuccess(false);
                    setIsLoading(true);
                    router.push("/results-self-management");
                  }}
                  className="w-full"
                  primary
                />
              </div>
            </>
          ) : null}
        </Modal>
      )}
    </div>
  );
};

const Modal: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClose, children, className }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-principal-50 bg-opacity-30 `}
      onClick={onClose}
      onKeyDown={(e) => {}}
    >
      <div
        className={`bg-principal-150 p-6 rounded-lg shadow-lg w-96 ${
          className || ""
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {}}
      >
        {children}
      </div>
    </div>
  );
};
