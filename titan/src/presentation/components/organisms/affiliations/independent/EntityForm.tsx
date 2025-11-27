"use client";
import { Entities } from "domain/models";
import { FormikProps } from "formik";
import { SelectOption } from "lib";
import {
  CustomInputOne,
  CustomSelectOne,
  NeutralBlackText,
} from "presentation/components/atoms";
import { FC, useEffect, useState } from "react";

export type EntityFormValuesType = {
  entity?: string | undefined;
};
type FormPropsType = {
  classnameContainer?: string;
  entitiesOptions: Entities;
  formik: FormikProps<EntityFormValuesType>;
};

export const EntityForm: FC<FormPropsType> = ({
  classnameContainer,
  entitiesOptions,
  formik,
}) => {
  const [type, setType] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [dig, setDig] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [entities, setEntities] = useState<SelectOption[]>([]);

  const onChange = (val: string) => {
    const entity = entitiesOptions.Entidades[parseInt(val)];
    if (!entity) {
      return;
    }

    setType("NIT");
    setNumber(entity.Nit.slice(0, -1));
    setDig(entity.Nit.slice(-1));
    setName(entity.RazonSocial);
  };

  useEffect(() => {
    const entitiesMAP: SelectOption[] = entitiesOptions.Entidades.map(
      (vals, index) => {
        return { value: index.toString(), label: vals.RazonSocial };
      }
    );
    setEntities(entitiesMAP);
  }, []);

  return (
    <div
      className={`flex flex-wrap overflow-y-scroll no-scrollbar ${classnameContainer}`}
    >
      <div className="flex-col">
        <form onSubmit={formik.handleSubmit} className="m-0 p-0">
          <div className="grid grid-cols-2 grid-flow-row gap-x-16 gap-y-6">
            <CustomSelectOne
              label="Entidad"
              value={formik.values.entity}
              onChange={(val) => {
                formik.setFieldValue("entity", val.target.value, true);

                onChange(val.target.value);
              }}
              options={entities}
              errors={
                formik.errors.entity ? (
                  <NeutralBlackText
                    text={formik.errors.entity}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <CustomInputOne
              disabled={true}
              label="Tipo de documento"
              value={type}
              onChange={(val) => {}}
            />
            <CustomInputOne
              disabled={true}
              label="Número de documento"
              value={number}
              onChange={(val) => {}}
            />
            <CustomInputOne
              disabled={true}
              label="Digito de verificación"
              value={dig}
              onChange={(val) => {}}
            />
            <CustomInputOne
              disabled={true}
              label="Razón Social"
              value={name}
              onChange={(val) => {}}
              classNameContainer="col-span-2 w-full"
            />
          </div>
          <div className="flex flex-col justify-start w-full my-6">
            <NeutralBlackText
              className={"text-principal-450 h-[calc(20px)] border-blue-500"}
              text={
                "Si la entidad no se encuentra en la lista de opciones puedes comunicarte: "
              }
            />
            <ul className="list-disc mt-6 pl-5 space-y-2 text-gray-800">
              <li>
                <strong>Contact Center:</strong>{" "}
                <a
                  href="tel:6024859999"
                  className="text-blue-600 hover:underline"
                >
                  602 4859999
                </a>
                , opción 4
              </li>
              <li>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/573156552124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  315 655 2124
                </a>
              </li>
              <li>
                <strong>Página web:</strong>{" "}
                <a
                  href="https://www.comfandi.com.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  www.comfandi.com.co
                </a>
              </li>
              <li>
                <strong>Conoce otros canales de atención:</strong>{" "}
                <a
                  href="https://www.comfandi.com.co/nosotros/puntos-de-atencion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Puntos de atención
                </a>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};
