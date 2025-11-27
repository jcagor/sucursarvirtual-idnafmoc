"use client";

import { useFormik, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Button,
  CustomInputOne,
  CustomSelectOne,
  MainTitle,
  NeutralBlackText,
  RolSelectSection,
  SecondaryText,
  SectionSeparator,
  useAppSelector,
} from "presentation";
import {
  getAdminBusinessList,
  MPAC_USER_ROLE,
  SelectOption,
  WORK_PLAN_UNITS,
  workPlanvalidation,
} from "lib";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { IUserToken } from "types";
import { WorkPlanType } from "domain/models/WorkPlan/WorkPlanType";
import { toast } from "react-toastify";
import { appContainer } from "infrastructure";
import CreateWorkPlanUseCase from "domain/usecases/WorkPlan/CreateWorkPlan.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";

const initialValues: WorkPlanType = {
  keyActivity: "",
  indicators: [
    {
      indicator: "",
      baseline: 0,
      unit: "",
      goal: 0,
      finalValue: 0,
      mobility: 0,
    },
    {
      indicator: "",
      baseline: 0,
      unit: "",
      goal: 0,
      finalValue: 0,
      mobility: 0,
    },
    {
      indicator: "",
      baseline: 0,
      unit: "",
      goal: 0,
      finalValue: 0,
      mobility: 0,
    },
  ],
  topicsToDiscuss: [""],
};

export const WorkPlan = () => {
  const { data: session } = useSession();
  const [business, setBusiness] = useState<SelectOption>();
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [businessList, setBusinessList] = useState<Array<SelectOption>>();
  const userRole = useAppSelector((state) => state.userRole);
  const selectedBusiness = useAppSelector(
    (state) => state.selectedBusiness
  );

  const getAdminInformation = async () => {
    const response = await getAdminBusinessList(session?.access_token ?? "");
    console.log(response);
    if (response && response.business.BUSINESS_SELECT?.length) {
      setBusinessList(response.business.BUSINESS_SELECT);
    }
  };

  useEffect(() => {
    getAdminInformation();
  }, []);

  useEffect(() => {
    if (userRole && userRole == MPAC_USER_ROLE.admin) {
      if (selectedBusiness) {
        console.log("Store selected", selectedBusiness);
        setBusiness(selectedBusiness);
      }
      setUserIsAdmin(true);
    }
  }, [selectedBusiness, userRole]);

  const getUserInfo = () => {
    let SessionToken = session?.access_token;

    if (SessionToken) {
      let userInfo: IUserToken = jwtDecode(SessionToken);
      return userInfo;
    }
    return;
  };

  const onSubmit = async (value: WorkPlanType) => {
    const values = { ...value, businessProfile_id: business?.shorthand };
    const createDataBusiness = appContainer.get<CreateWorkPlanUseCase>(
      USECASES_TYPES._CreateWorkPlanUseCase
    );

    const response = await createDataBusiness.execute(values);
    if (!response) {
      toast.error(
        "Error al crear el plan de trabajo. Inténtalo de nuevo más tarde."
      );
      return;
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: workPlanvalidation,
    onSubmit,
  });

  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    handleSubmit,
    submitCount,
  } = formik;

  const getFieldError = (field: string) => {
    const error = formik.getFieldMeta(field).error;
    const touched = formik.getFieldMeta(field).touched;
    return touched || submitCount > 0 ? error : undefined;
  };

  return (
    <>
      {userIsAdmin && (
        <RolSelectSection
          options={businessList ?? []}
          userName={getUserInfo() ? getUserInfo()?.given_name : "Usuario"}
          selectedValue={business}
        />
      )}
      <div className="w-full md:w-11/12 xl:w-2/3">
        <MainTitle text="Plan de trabajo" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
          <CustomInputOne
            name="keyActivity"
            title="Actividad clave"
            value={values.keyActivity}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={
              (touched.keyActivity || submitCount > 0) && errors.keyActivity ? (
                <NeutralBlackText
                  text={errors.keyActivity}
                  className="text-principal-500"
                />
              ) : null
            }
          />

          <FormikProvider value={formik}>
            <FieldArray
              name="indicators"
              render={(arrayHelpers) => (
                <>
                  {values.indicators.map((_, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-x-4 gap-y-3 mb-2 "
                    >
                      <div className="col-span-1 md:col-span-2 xl:col-span-3 2xl:col-span-5">
                        <SectionSeparator className="m-0" />
                        <div className="flex justify-between">
                          <SecondaryText text={`Indicador n°${index + 1}`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            className="text-red-600 hover:text-red-800"
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>

                      <CustomInputOne
                        name={`indicators[${index}].indicator`}
                        title="Indicador asociado"
                        value={values.indicators[index].indicator}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={
                          getFieldError(`indicators[${index}].indicator`) ? (
                            <NeutralBlackText
                              text={
                                getFieldError(`indicators[${index}].indicator`)!
                              }
                              className="text-principal-500"
                            />
                          ) : null
                        }
                        ClassNameContainer="col-span-1 md:col-span-2 xl:col-span-3 2xl:col-span-5"
                      />

                      <CustomInputOne
                        name={`indicators[${index}].baseline`}
                        title="Línea base"
                        type="number"
                        value={values.indicators[index].baseline}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={
                          getFieldError(`indicators[${index}].baseline`) ? (
                            <NeutralBlackText
                              text={
                                getFieldError(`indicators[${index}].baseline`)!
                              }
                              className="text-principal-500"
                            />
                          ) : null
                        }
                      />

                      <CustomSelectOne
                        name={`indicators[${index}].unit`}
                        label="Unidad"
                        options={WORK_PLAN_UNITS}
                        value={values.indicators[index].unit}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={
                          getFieldError(`indicators[${index}].unit`) ? (
                            <NeutralBlackText
                              text={getFieldError(`indicators[${index}].unit`)!}
                              className="text-principal-500"
                            />
                          ) : null
                        }
                      />

                      <CustomInputOne
                        name={`indicators[${index}].goal`}
                        title="Meta"
                        type="number"
                        value={values.indicators[index].goal}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={
                          getFieldError(`indicators[${index}].goal`) ? (
                            <NeutralBlackText
                              text={getFieldError(`indicators[${index}].goal`)!}
                              className="text-principal-500"
                            />
                          ) : null
                        }
                      />

                      <CustomInputOne
                        name={`indicators[${index}].finalValue`}
                        title="Valor final"
                        type="number"
                        value={values.indicators[index].finalValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={
                          getFieldError(`indicators[${index}].finalValue`) ? (
                            <NeutralBlackText
                              text={
                                getFieldError(
                                  `indicators[${index}].finalValue`
                                )!
                              }
                              className="text-principal-500"
                            />
                          ) : null
                        }
                      />

                      <CustomInputOne
                        name={`indicators[${index}].mobility`}
                        title="Movilidad"
                        type="number"
                        value={values.indicators[index].mobility}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={
                          getFieldError(`indicators[${index}].mobility`) ? (
                            <NeutralBlackText
                              text={
                                getFieldError(`indicators[${index}].mobility`)!
                              }
                              className="text-principal-500"
                            />
                          ) : null
                        }
                      />
                    </div>
                  ))}

                  <SectionSeparator className="m-0" />

                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        indicator: "",
                        baseline: 0,
                        unit: "",
                        goal: 0,
                        finalValue: 0,
                        mobility: 0,
                      })
                    }
                    className="text-blue-600 text-sm hover:underline"
                  >
                    ➕ Agregar indicador
                  </button>
                </>
              )}
            />
            <FieldArray
              name="topicsToDiscuss"
              render={(arrayHelpers) => (
                <div className="flex flex-col gap-4">
                  <SectionSeparator />
                  <MainTitle text="Temas a tratar:" />

                  {values.topicsToDiscuss.map((topic, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <CustomInputOne
                        name={`topicsToDiscuss[${index}]`}
                        title={`Tema ${index + 1}`}
                        value={topic}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        errors={
                          getFieldError(`topicsToDiscuss[${index}]`) ? (
                            <NeutralBlackText
                              text={getFieldError(`topicsToDiscuss[${index}]`)!}
                              className="text-principal-500"
                            />
                          ) : null
                        }
                        ClassNameContainer="flex-1"
                      />
                      {values.topicsToDiscuss.length > 1 && (
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-800 mt-7"
                          title="Eliminar tema"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => arrayHelpers.push("")}
                    className="text-blue-600 text-sm hover:underline mt-2"
                  >
                    ➕ Agregar tema
                  </button>
                </div>
              )}
            />
          </FormikProvider>
          <Button
            type="submit"
            label="Guardar plan de trabajo"
            className="w-56 xl:w-72 mt-5"
            primary
          />
        </form>
      </div>
    </>
  );
};
