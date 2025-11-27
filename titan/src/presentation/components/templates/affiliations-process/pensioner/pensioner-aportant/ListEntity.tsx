"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { Entidades } from "domain/models";
import { useRouter } from "next/navigation";
import {
  Button,
  CardText,
  CustomSelectFormFixed,
  SectionSeparator,
  Spinner,
} from "presentation/components/atoms";
import { usePensionerAffiliations } from "presentation/hooks";
import { useAppSelector } from "presentation/store";
import { useEffect, useState } from "react";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import GetEntitiesUseCase from "domain/usecases/entities/getEntities.use.case";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { useSession } from "next-auth/react";
import { ENTITIES_AFFILIATIONS_APORTANT } from "lib/config/constants";

type Option = {
  value: string;
  label: string;
};

const ListEntity = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingNextStep, setIsLoadingNextStep] = useState(false);
  const [entities, setEntities] = useState<Entidades[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [errors, setErrors] = useState("");
  const [selectedEntity, setSelectedEntity] = useState<Option | null>(null);
  const data = useAppSelector((state) => state.pensionerAffiliations);
  const { data: session } = useSession();
  
  // --- Use Cases 
  const getEntitiesUseCase = appContainer.get<GetEntitiesUseCase>(
    USECASES_TYPES._GetEntitiesUseCase
  );

  const router = useRouter();
  const { saveEntity } = usePensionerAffiliations();

  const handleChange = (value: Option) => {
    setSelectedEntity(value);
    setErrors("");
  };

  const handleNextStep = () => {
    if (isLoadingNextStep) return;
    setIsLoadingNextStep(true);
    try {
      if (selectedEntity?.value === "" || selectedEntity === undefined) {
        setErrors("La entidad es requerida");
        return;
      }
      const findEntity: Entidades | undefined = entities.find(
        (entity) => entity.Nit === selectedEntity?.value
      );
      saveEntity(findEntity!);
      router.push(
        "/menu-affiliations/pensioner/pensioner-aportant/complete-information"
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNextStep(false);
    }
  };


  const getEntities = async () => {
    try {
      if (!data.isStarted) {
        router.push("/menu-affiliations");
        return;
      }
  
      const response = await getEntitiesUseCase.execute(
        ENTITIES_AFFILIATIONS_APORTANT,
        session?.access_token
      );
  
      if (response instanceof Error) {
        return;
      }
  
      const options = response?.Entidades
        .filter(
          (entity) =>
            entity.Nit && entity.Nit.trim() !== "" &&
            entity.RazonSocial && entity.RazonSocial.trim() !== ""
        )
        .map((entity) => ({
          value: entity.Nit,
          label: entity.RazonSocial, 
        }));
  
      if (data.entity.Nit !== "") {
        const findEntity: Entidades | undefined = response?.Entidades.find(
          (entity) => entity.Nit === data.entity.Nit
        );
        if (findEntity?.RazonSocial) {
          setSelectedEntity({
            value: findEntity.Nit,
            label: findEntity.RazonSocial, 
          });
        }
      }
  
      setEntities(response?.Entidades || []);
      setOptions(options || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getEntities();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-12 mb-12">
        <CardText
          text="Afiliaciones / afiliación pensionado"
          className="text-principal-180 text-2xl"
        />
        <MainTitle text="Afiliación pensionado" />
        <SectionSeparator />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-12">
        <div className="w-full max-w-[912px] bg-principal-150 flex flex-col gap-12 px-16 py-12 rounded-3xl shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center border-2 border-principal-180 rounded-full w-10 h-10">
              <p className="text-principal-180 text-lg font-semibold">1</p>
            </div>
            <h2 className="text-principal-180 text-2xl font-semibold">
              Confirma los datos de la entidad de tu pensión
            </h2>
          </div>
          <div className="w-full mb-8">
            <CustomSelectFormFixed
              setValue={() => {}}
              title="Razón Social*"
              placeholder="Selecciona una entidad"
              options={options}
              onChange={handleChange}
              value={selectedEntity}
              errors={<p className="text-principal-500">{errors}</p>}
            />
          </div>
        </div>
        <div className="w-full max-w-[912px] flex flex-row items-center justify-between mt-0">
          <div className="min-w-[320px] max-w-[420px] bg-white rounded-lg p-4 shadow border border-gray-200">
            <p className="text-sm text-black">
              Si la entidad pagadora de Pensión no se encuentra en la lista de opciones por favor radicar un caso al área de afiliaciones Comfandi por medio de:<br />
              <span className="font-semibold">www.comfandi.comco - Atención ciudadana - PQRS</span>
            </p>
          </div>
          <Button
            label={isLoadingNextStep ? "Cargando..." : "Siguiente"}
            primary={true}
            className="w-96"
            primaryClass={
              selectedEntity === null
                ? "bg-principal-50 text-principal-150 cursor-not-allowed"
                : "bg-principal-700 text-principal-150"
            }
            onClick={handleNextStep}
            disabled={selectedEntity === null || isLoadingNextStep}
          />
        </div>
      </div>
    </div>
  );
};

export default ListEntity;
