"use client";
import { VacantRegisterForm } from "domain/models";
import { FormProps } from "lib/types/form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  CardText,
  Greatment,
  NeutralNCText,
  SectionSeparator,
} from "presentation/components/atoms";
import Modal from "presentation/components/atoms/common/modals/Modal";
import { addAlert } from "presentation/store/slices/alertSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const FinishVacancyRegister: React.FC<FormProps> = ({
  formRef,
  nextSteepFn,
  previousSteepFn,
  formSelectOptionsFn,
  dataStorageSetFn,
  dataStorageGetFn,
}) => {
  //Router para navegación
  const router = useRouter();

  const [solicitudeNumber, setSolicitudeNumber] = useState("");
  const [solicitudeStatus, setSolicitudeStatus] = useState("");

  useEffect(() => {
    const data: VacantRegisterForm = dataStorageGetFn();
    if (data) {
      setSolicitudeNumber(data.solicitudeNumber);
      setSolicitudeStatus(data.solicitudeStatus);
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col mr-[64px]">
      <Greatment
        text={"¡Tu vacante ha sido registrada con éxito!"}
        className="mb-2 md:mb-7 md:-mt-3"
      />
      <SectionSeparator />

      <div className="flex flex-col w-11/12 xl:w-[874px]">
        <div className="bg-[#FFF] w-full min-h-80 h-96 bg-[url(/utopia/img/vacant_ok.png)] bg-right bg-no-repeat shadow-lg rounded-lg">
          {/** flex flex-col items-center justify-center relative rounded-[1.25rem] bg-principal-150 */}

          <div className="block mt-20 mx-20">
            <Image
              src="/utopia/icons/check_ok.svg"
              alt="OK Icon"
              width={68}
              height={68}
              className={``}
              draggable={false}
            />

            <div className="mt-10">
              <NeutralNCText
                className="font-bold"
                text="Tu solicitud ha sido enviada correctamente."
              />
              <div className="my-3">
                <NeutralNCText className="my-1" text="Número de solicitud:" />
                <NeutralNCText
                  className="my-1 text-[#97D700]"
                  text={solicitudeNumber}
                />
                <NeutralNCText className="my-1" text="Estado actual:" />
                <NeutralNCText
                  className="my-1 text-[#97D700]"
                  text={solicitudeStatus}
                />
              </div>
            </div>
          </div>
        </div>
        <Button
          label="Volver al inicio"
          className="w-56 xl:w-72 my-6 self-end"
          primary
          onClick={() => {
            router.push("job-vacancies");
          }}
        />
      </div>
    </div>
  );
};
