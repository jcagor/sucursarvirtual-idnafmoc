import Image from "next/image";
import { Greatment, SectionSeparator } from "presentation/components/atoms";
import { HeaderNotificationCard } from "presentation/components/molecules/common/notification";

interface ListOfCoursesProps {
  setCurrentForm: (form: number) => void;
}

export const ListOfCourses: React.FC<ListOfCoursesProps> = ({
  setCurrentForm,
}) => {
  return (
    <div className="w_full md:w-11/12">
      <HeaderNotificationCard
        startText="¡Tu empresa ya puede acceder al portafolio de entrenamientos Comfandi!"
        middleBoldText=""
        endText=""
      />
      <Greatment text={`Bienvenid@ 👋`} className="mb-2 md:mb-7 md:-mt-3" />
      <SectionSeparator />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        <CardCourse
          Title="Cultura de Innovación"
          Text="Desarrolla estrategias innovadoras para potenciar la creatividad y el crecimiento empresarial."
          Icon="/utopia/icons/workshop.png"
        />
        <CardCourse
          Title="Líderes del Cambio"
          Text="Fortalece tus habilidades de liderazgo para gestionar transformaciones organizacionales efectivas."
          Icon="/utopia/icons/stock-growth-chart.png"
        />
        <CardCourse
          Title="Power BI"
          Text="Aprende a visualizar y analizar datos estratégicos con Power BI para la toma de decisiones."
          Icon="/utopia/icons/circular-chart.png"
        />
        <CardCourse
          Title="Workshop IA"
          Text="Explora el impacto de la inteligencia artificial en los negocios y su aplicación en el día a día."
          Icon="/utopia/icons/pc.png"
        />
        <CardCourse
          Title="Workshop Marketing Digital"
          Text="Domina estrategias digitales para potenciar la presencia online y el crecimiento de tu marca."
          Icon="/utopia/icons/plan-board.png"
        />
        <CardCourse
          Title="Responsabilidad Social Empresarial"
          Text=" Implementa prácticas sostenibles para generar un impacto positivo en la sociedad y la empresa."
          Icon="/utopia/icons/brief-icon.png"
        />
        <CardCourse
          Title="Gestión Logística"
          Text="Optimiza procesos logísticos para mejorar la eficiencia y competitividad empresarial."
          Icon="/utopia/icons/financial-analysis-chart.png"
        />
      </div>
    </div>
  );
};

interface courseProps {
  Title: string;
  Text: string;
  Icon: string;
  IconHeight?: number;
  IconWidth?: number;
}

const CardCourse: React.FC<courseProps> = ({
  Title,
  Text,
  Icon,
  IconHeight,
  IconWidth,
}) => {
  return (
    <button className="bg-principal-150 rounded-xl shadow-md p-6 hover:bg-opacity-5 hover:bg-principal-180">
      <div className="flex items-center gap-3">
        <Image
          src={Icon}
          alt="img"
          width={IconWidth ?? 50}
          height={IconHeight ?? 50}
        />
        <div className="text-principal-180 font-bold text-lg">{Title}</div>
      </div>
      <div className="text-principal-450 mt-3 text-sm leading-relaxed">
        {Text}
      </div>
    </button>
  );
};
