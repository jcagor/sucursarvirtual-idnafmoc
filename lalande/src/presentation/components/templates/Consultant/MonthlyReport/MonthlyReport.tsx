"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { useFormik } from "formik";
import {
  Button,
  ModalWithChildren,
  SecondaryText,
  SectionEighthMonthlyReport,
  SectionFirstMonthlyReport,
  SectionFiveMonthlyReport,
  SectionFourthMonthlyReport,
  SectionSecondMonthlyReport,
  SectionSeparator,
  SectionSevenMonthlyReport,
  SectionSixMonthlyReport,
  SectionThirdMonthlyReport,
} from "presentation";
import { useState } from "react";
import Image from "next/image";
import { MonthlyReportValidation } from "lib";
import { appContainer } from "infrastructure";
import CreateMonthlyReportUseCase from "domain/usecases/MonthlyReport/createMonthlyReport.use.case";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { MonthlyReportType } from "domain/models/MonthlyReport/MonthlyReportType";
import { useSession } from "next-auth/react";
import { SectionNinthMonthlyReport } from "presentation/components/organisms/Consultant/MonthlyReport/SectionNinthMonthlyReport";
import { toast } from "react-toastify";

const initialValues: MonthlyReportType = {
  introduction: "",
  companyName: "",
  businessId: "",
  budgetedHoursPerMonth: 0,
  hoursExecutedPerMonth: 0,
  expectedProgressPercentage: 0,
  totalProgress: 0,
  lineOfIntervention: "",
  associatedIndicators: "",
  conclusions: "",
  interventionCompanyName: "",
  prioritisedLineOfIntervention: "",
  indicatorsProgress: 0,
  actionPlanDuringTheExecutionPeriod: "",
  description: "",
  complianceWithResults: "",
  milestones: [
    { number: 1, percentageOfProgress: 0, description: "", file: null },
    { number: 2, percentageOfProgress: 0, description: "", file: null },
  ],
  milestoneInterventions: [
    {
      capital: "",
      newMarkets: "",
      newSuppliers: "",
      others: "",
      observations: "",
    },
    {
      capital: "",
      newMarkets: "",
      newSuppliers: "",
      others: "",
      observations: "",
    },
    {
      capital: "",
      newMarkets: "",
      newSuppliers: "",
      others: "",
      observations: "",
    },
  ],
  reportFindings: [
    {
      improvementOpportunity: "",
      actionPlan: "",
      correctionDate: new Date(),
    },
    {
      improvementOpportunity: "",
      actionPlan: "",
      correctionDate: new Date(),
    },
  ],
  hoursRecorded: 0,
  valueBeforeIVA: 0,
  valueIVA: 0,
  valueIncludedIVA: 0,
  annexes: [
    {
      annexType: "Cronogramas por empresa",
      quantity: "",
      detail: "",
    },
    {
      annexType: "Planes de trabajo por empresa",
      quantity: "",
      detail: "",
    },
    {
      annexType: "Informes",
      quantity: "",
      detail: "",
    },
    {
      annexType: "Tableros de seguimiento actualizados",
      quantity: "",
      detail: "",
    },
    {
      annexType: "Actas de asistencia",
      quantity: "",
      detail: "",
    },
  ],
  urlPowerBi: "",
};

export const MonthlyReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();

  const onSubmit = async (values: MonthlyReportType) => {
    const createDataBusiness = appContainer.get<CreateMonthlyReportUseCase>(
      USECASES_TYPES._CreateMonthlyReportUseCase
    );

    const response = await createDataBusiness.execute(
      values,
      session?.access_token
    );
    if (!response) {
      toast.error(
        "Error al guardar el informe mensual, por favor intente mas tarde"
      );
      return;
    }
    setOpenModal(true);
  };

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    touched,
    submitCount,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: MonthlyReportValidation,
  });

  return (
    <div className="w-full md:w-11/12 2xl:w-2/3">
      <MainTitle text="Informe mensual" />
      <SecondaryText text="Programa productividad operacional" />
      <SectionSeparator className="mb-4" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <SectionFirstMonthlyReport
          values={values}
          errors={errors}
          touched={touched}
          submitCount={submitCount}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <SectionSecondMonthlyReport
          values={values}
          errors={errors}
          touched={touched}
          submitCount={submitCount}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />

        <SectionThirdMonthlyReport
          values={values}
          errors={errors}
          touched={touched}
          submitCount={submitCount}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <SectionFourthMonthlyReport
          values={values}
          errors={errors}
          touched={touched}
          submitCount={submitCount}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />

        <SectionFiveMonthlyReport
          values={values}
          errors={errors}
          touched={touched}
          submitCount={submitCount}
          handleChange={handleChange}
          handleBlur={handleBlur}
          setFieldValue={setFieldValue}
        />

        <SectionSixMonthlyReport
          values={values}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <SectionSevenMonthlyReport
          values={values}
          errors={errors}
          touched={touched}
          submitCount={submitCount}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <SectionEighthMonthlyReport
          values={values}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <SectionNinthMonthlyReport
          values={values}
          errors={errors}
          touched={touched}
          submitCount={submitCount}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

        <Button
          type="submit"
          label="Guardar información"
          className="w-56 xl:w-72 self-end my-6"
          primary
        />
      </form>
      {openModal && (
        <ModalWithChildren
          onClose={() => setOpenModal(false)}
          className={`md:w-[463px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          <Image
            src="/lalande/icons/check_ok.svg"
            alt="Close icon"
            width={80}
            height={80}
            priority
          />
          <h4 className="font-outfit text-[1rem] text-center w-[60%] font-semibold mb-2 pt-6 text-principal-180 mt-2">
            ¡Información registrada con éxito!
          </h4>
          <div className="flex flex-col w-[70%] space-y-3 py-2">
            <Button
              label="Continuar"
              onClick={() => {
                setOpenModal(false);
                resetForm();
              }}
              className="w-full"
              primary
            />
          </div>
        </ModalWithChildren>
      )}
    </div>
  );
};
