"use client";
import { useEffect, useState } from "react";
import { IndependentTemplate } from "../IndependentTemplate";
import { ActionIconCard, StepSection } from "presentation/components/molecules";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "presentation/store";
import { setIndependentState } from "presentation/store/independent/independentSlice";
import { independentForm } from "domain/models";
import { useRnec } from "presentation/hooks";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { UserDataInterface } from "lib";

export const StepOneIndependent = () => {
  //Router para navegacion
  const router = useRouter();
  const dispatch = useAppDispatch();
  const independentForm = useAppSelector((state) => state.independentSlice);
  const { validateIdentityHandler } = useRnec();
  const { data: session } = useSession();
  const decodedToken: UserDataInterface = jwtDecode(session?.access_token!);
  const options = [
    {
      text: "¿Eres una persona independiente o contratista que realiza su actividad económica por su cuenta?",
      imageUrl: "/icons/independentIcon.png",
      imageWidth: 77,
      imageHeight: 77,
      imageClassname: "",
      isSelected: false,
    },
    {
      text: "¿Eres una persona natural residente en el exterior y viaja a Colombia?",
      imageUrl: "/icons/mapIcon.png",
      imageWidth: 97,
      imageHeight: 70,
      imageClassname: "",
      isSelected: false,
    },
    {
      text: "Eres un independiente que pertenece a una entidad, asociación o agremiación?. Debes seleccionar la entidad para realizar la afiliación.",
      imageUrl: "/icons/maletinIcon.png",
      imageWidth: 67.31,
      imageHeight: 66,
      imageClassname: "",
      isSelected: false,
    },
  ];
  const [selectedId, setSelectedId] = useState<number>(0);

  useEffect(() => {
    validateIdentityHandler(
      session?.access_token || "",
      decodedToken?.identification_number || "",
      decodedToken?.identification_type || ""
    );
  }, []);

  return (
    <IndependentTemplate
      mainTitle="Afiliación independiente"
      description=""
      onBackButton={() => {
        router.back();
      }}
      onNextButton={() => {
        let independentAux: independentForm = {};
        independentAux.Selection = selectedId.toString();
        dispatch(setIndependentState(independentAux));

        if (selectedId == 0) {
          router.push("independent-flow/step-two");
        }
        if (selectedId == 1) {
          router.push("foreign-flow/step-two");
        }
        if (selectedId == 2) {
          router.push("entity-flow/step-two");
        }
      }}
    >
      <StepSection
        number={1}
        descriptionStep="Selecciona la información que mejor te describe como independiente"
        className="w-4/5"
      />
      <div>
        {options.map((value, index) => {
          return (
            <ActionIconCard
              key={index}
              index={index}
              text={value.text}
              imageUrl={value.imageUrl}
              imageWidth={value.imageWidth}
              imageHeight={value.imageHeight}
              imageClassname={value.imageClassname}
              isSelected={selectedId === index}
              onClickButton={() => {
                setSelectedId(index);
              }}
            />
          );
        })}
      </div>
    </IndependentTemplate>
  );
};
