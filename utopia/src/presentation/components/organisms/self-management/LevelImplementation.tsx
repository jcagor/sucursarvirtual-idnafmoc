"use client";
import { MainTitle } from "@comfanditd/chronux-ui";
import { Button, SecondaryText, SectionSeparator } from "presentation";

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const LevelImplementation: React.FC<CurrentFormProps> = ({
  setCurrentForm,
}) => {
  const handleNextForm = () => {
    setCurrentForm(3);
  };

  const previousForm = () => {
    setCurrentForm(1);
  };

  return (
    <div className="w-full h-full items-center flex flex-col">
      <form
        onSubmit={handleNextForm}
        className="flex flex-col w-full md:w-10/12"
      >
        <MainTitle text="Autodiagnóstico" />
        <SecondaryText text="El Análisis Situacional es una herramienta analítica que permite comprender el grado de madurez de las capacidades de su organización relacionadas a la gestión. Esta herramienta le permite identificar a nuestro grupo de expertos cuales son las principales alternativas de implementación de programas de gestión para el mejoramiento de los resultados." />
        <SectionSeparator />
        <div className="grid grid-cols-[1fr_2fr] text-center py-3 ">
          <div className="text-principal-180">
            <p>NIVEL DE IMPLEMENTACIÓN</p>
          </div>
          <div className="text-principal-180">
            <p>DESCRIPCIÓN</p>
          </div>
        </div>
        <Card
          color="bg-principal-500"
          title="Nivel Básico"
          titleColor="text-principal-500"
          text='La empresa no tiene un programa de gestión formal o está en las primeras etapas de implementación. No hay una comprensión clara de los beneficios de un programa de gestión. Si la pregunta "No Aplica" para su empresa, seleccione "1 - Nivel Básico".'
        />
        <Card
          color="bg-[#FCBC68]"
          title="En Desarrollo"
          titleColor="text-[#FCBC68]"
          text="La empresa ha comenzado a implementar un programa de gestión, pero todavía está en una etapa temprana. Los procesos están en desarrollo y la empresa está empezando a ver algunos beneficios."
        />
        <Card
          color="bg-[#FCEA68]"
          title="Estructurado"
          titleColor="text-principal-450"
          text="La empresa tiene un programa de gestión bien definido y estructurado. Los procesos están documentados y estandarizados, la empresa está viendo beneficios significativos en términos de productividad."
        />
        <Card
          color="bg-[#A8D08D]"
          title="Implementado"
          titleColor="text-[#A8D08D]"
          text="La empresa tiene un programa de gestión bien definido, además lo está gestionando de manera efectiva. Hay un seguimiento constante, una mejora continua de los procesos,  está viendo beneficios claros y medibles con indicadores definidos."
        />
        <Card
          color="bg-[#00B050]"
          title="Optimizado"
          titleColor="text-[#00B050]"
          text="La empresa tiene un programa de gestión que está completamente integrado en el sistema de gestión. Los procesos se están optimizando constantemente y la empresa está obteniendo el máximo beneficio de su programa de gestión."
        />
        <div className="flex flex-row justify-between items-center">
          <a
            className="cursor-pointer"
            onClick={previousForm}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                previousForm();
              }
            }}
          >
            Atrás
          </a>
          <Button
            type="submit"
            label="Siguiente"
            className="w-56 xl:w-72 self-end my-6"
            primary
          />
        </div>
      </form>
    </div>
  );
};

interface CardProps {
  color: string;
  title: string;
  titleColor: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ color, title, titleColor, text }) => {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-2 p-4 rounded-lg shadow-lg bg-principal-150 my-2">
      <div className="flex items-center justify-center space-x-3 text-center">
        <div
          className={`w-8 h-8 rounded-full ${color}`} // Color dinámico
        ></div>
        <p className={`font-semibold text-2xl ${titleColor}`}>{title}</p>
      </div>

      <div className="flex-1">
        <p className="text-lg text-principal-450 leading-5 xl:leading-6">
          {text}
        </p>
      </div>
    </div>
  );
};
