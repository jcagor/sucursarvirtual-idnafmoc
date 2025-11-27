"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  Greatment,
  NeutralNCText,
  SectionSeparator,
} from "presentation/components/atoms";

interface ConfirmationMessageProps {
  numberEmployeesRegisteredNow: number;
  totalNumberRegisteredEmployees: number;
  numberEmployeesToStartCourse: number;
}

export const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({
  numberEmployeesRegisteredNow,
  totalNumberRegisteredEmployees,
  numberEmployeesToStartCourse,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full md:w-11/12 items-center">
      <Greatment
        text={"¡Has inscrito a " + numberEmployeesRegisteredNow + " empleados!"}
        className="text-center mb-2 md:mb-7 md:-mt-3"
      />
      <SectionSeparator className="w-full" />

      <div className="flex flex-col items-center w-11/12 xl:w-[874px]">
        <div className="bg-[#FFF] w-full min-h-80 h-96 bg-[url(/utopia/img/vacant_ok.png)] bg-right bg-no-repeat shadow-lg rounded-lg">
          <div className="block mt-12 mx-20">
            <Image
              src="/utopia/icons/check_ok.svg"
              alt="OK Icon"
              width={68}
              height={68}
              className={``}
              draggable={false}
            />

            <div className="mt-8">
              <NeutralNCText
                className="font-bold my-2"
                text={`Se han inscrito ${totalNumberRegisteredEmployees} empleados en total en el curso.`}
              />
              <NeutralNCText
                className="font-bold my-2"
                text={`Recuerda que el curso inicia con ${numberEmployeesToStartCourse} empleados`}
              />
              <div className="flex flex-col gap-2 my-6">
                {/* <NeutralNCText className="" text="Estado actual:" />
                <NeutralNCText
                  className="text-principal-700"
                  text="En proceso de validación"
                /> */}
                <NeutralNCText className="" text="Estado actual:" />
                <NeutralNCText
                  className="text-principal-700"
                  text="Inscripción confirmada"
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          label="Volver al inicio"
          className="w-56 xl:w-72 my-6 self-end"
          primary
          onClick={() => router.push("/worker-management")}
        />
      </div>
    </div>
  );
};
