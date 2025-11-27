"use client";

import { MainTitle, TertiaryTitle } from "@comfanditd/chronux-ui";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  CustomInputOne,
  CustomPriceInput,
  CustomTextarea,
  Milestones,
  NeutralBlackText,
  NumberCircle,
  SecondaryText,
  SectionSeparator,
} from "presentation";
import { SectionFiveMonthlyReport } from "presentation/components/molecules/Consultant/MonthlyReport/SectionFiveMonthlyReport";
import { SectionSixMonthlyReport } from "presentation/components/molecules/Consultant/MonthlyReport/SectionSixMonthlyReport";
import { SectionSevenMonthlyReport } from "presentation/components/molecules/Consultant/MonthlyReport/SectionSevenMonthlyReport";
import { useState } from "react";
import Image from "next/image";
import { ModalTitle } from "presentation/components/atoms/common/modals/text/ModalTitle";

const initialValues = {
  Introduction: "",
  CompanyName: "",
  BudgetedHoursPerMonth: 0,
  HoursExecutedPerMonth: 0,
  ExpectedProgressPercentage: 0,
  Totalprogress: 0,
  LineOfIntervention: "",
  Associatedindicators: "",
  Conclusions: "",
  InterventionCompanyName: "",
  PrioritisedLineOfIntervention: "",
  IndicatorsProgress: 0,
  ActionPlanDuringTheExecutionPeriod: "",
  Description: "",
  ComplianceWithResults: "",
  HoursRecorded: 0,
  ValueBeforeIVA: 0,
  ValueIVA: 0,
  ValueIncludedIVA: 0,
};

const validationSchema = Yup.object().shape({
  Introduction: Yup.string().required("Este campo es obligatorio"),
  CompanyName: Yup.string().required("Este campo es obligatorio"),
  BudgetedHoursPerMonth: Yup.number().required("Este campo es obligatorio"),
  HoursExecutedPerMonth: Yup.number().required("Este campo es obligatorio"),
  ExpectedProgressPercentage: Yup.number().required(
    "Este campo es obligatorio"
  ),
  Totalprogress: Yup.number().required("Este campo es obligatorio"),
  LineOfIntervention: Yup.string().required("Este campo es obligatorio"),
  Associatedindicators: Yup.string().required("Este campo es obligatorio"),
  Conclusions: Yup.string().required("Este campo es obligatorio"),
  InterventionCompanyName: Yup.string().required("Este campo es obligatorio"),
  PrioritisedLineOfIntervention: Yup.string().required(
    "Este campo es obligatorio"
  ),
  IndicatorsProgress: Yup.number().required("Este campo es obligatorio"),
  ActionPlanDuringTheExecutionPeriod: Yup.string().required(
    "Este campo es obligatorio"
  ),

  ComplianceWithResults: Yup.string().required("Este campo es obligatorio"),
  HoursRecorded: Yup.number().required("Este campo es obligatorio"),
  ValueBeforeIVA: Yup.number().required("Este campo es obligatorio"),
  ValueIVA: Yup.number().required("Este campo es obligatorio"),
  ValueIncludedIVA: Yup.number().required("Este campo es obligatorio"),
});

export const MonthlyReport = () => {
  const [openModal, setOpenModal] = useState(false);
  const onSubmit = async () => {};

  const { errors, handleSubmit, handleChange, values } = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <div className="w-full md:w-11/12 xl:w-2/3">
      <MainTitle text="Informe mensual" />
      <SecondaryText text="Programa productividad operacional" />
      <SectionSeparator className="mb-4" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-row items-center">
          <NumberCircle number={1} />
          <TertiaryTitle
            text="Introducción / contexto general"
            className="ml-3"
          />
        </div>
        <SecondaryText text="Completa la Información" />

        <CustomTextarea
          name="Introduction"
          id="Introduction"
          title="Realice una breve introducción sobre la presentación de los procesos y actividades que se presentaran en el informe."
          placeholder='En este informe se presentarán los principales procesos y actividades que sustentan el negocio "Carnesanchez". Se detallarán aspectos clave como la selección de proveedores, la producción de productos cárnicos, el manejo de inventarios y las estrategias de distribución y marketing implementadas por la familia Sánchez.'
          value={values.Introduction}
          onChange={handleChange}
          errors={
            errors.Introduction ? (
              <NeutralBlackText
                text={errors.Introduction}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <div className="flex flex-row items-center">
          <NumberCircle number={2} />
          <TertiaryTitle
            text="Consolidado ejecutivo de empresas mensual"
            className="ml-3"
          />
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomInputOne
            name="CompanyName"
            id="CompanyName"
            title="Nombre de la empresa:"
            placeholder="Carnesanchez S.A."
            value={values.CompanyName ?? ""}
            onChange={handleChange}
            errors={
              errors.CompanyName ? (
                <NeutralBlackText
                  text={errors.CompanyName}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="BudgetedHoursPerMonth"
            id="BudgetedHoursPerMonth"
            title="Horas presupuestadas por mes:"
            placeholder="320"
            type="number"
            value={values.BudgetedHoursPerMonth}
            onChange={handleChange}
            errors={
              errors.BudgetedHoursPerMonth ? (
                <NeutralBlackText
                  text={errors.BudgetedHoursPerMonth}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="HoursExecutedPerMonth"
            id="HoursExecutedPerMonth"
            title="Horas ejecutadas por mes:"
            placeholder="300"
            type="number"
            value={values.HoursExecutedPerMonth ?? ""}
            onChange={handleChange}
            errors={
              errors.HoursExecutedPerMonth ? (
                <NeutralBlackText
                  text={errors.HoursExecutedPerMonth}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="ExpectedProgressPercentage"
            id="ExpectedProgressPercentage"
            title="Porcentaje de avance esperado (%): "
            placeholder="94"
            type="number"
            value={values.ExpectedProgressPercentage}
            onChange={handleChange}
            errors={
              errors.ExpectedProgressPercentage ? (
                <NeutralBlackText
                  text={errors.ExpectedProgressPercentage}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="Totalprogress"
            id="Totalprogress"
            title="Avance total (%):"
            placeholder="91"
            type="number"
            value={values.Totalprogress ?? ""}
            onChange={handleChange}
            errors={
              errors.Totalprogress ? (
                <NeutralBlackText
                  text={errors.Totalprogress}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="LineOfIntervention"
            id="LineOfIntervention"
            title="Línea de intervención: "
            placeholder="Producción y distribución de carne al por mayor."
            value={values.LineOfIntervention}
            onChange={handleChange}
            errors={
              errors.LineOfIntervention ? (
                <NeutralBlackText
                  text={errors.LineOfIntervention}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </div>

        <CustomTextarea
          name="Associatedindicators"
          id="Associatedindicators"
          title="Indicadores asociados:"
          placeholder="Cumplimiento de entregas, calidad, eficiencia."
          value={values.Associatedindicators}
          onChange={handleChange}
          errors={
            errors.Associatedindicators ? (
              <NeutralBlackText
                text={errors.Associatedindicators}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomTextarea
          name="Conclusions"
          id="Conclusions"
          title="Conclusiones:"
          placeholder="Mejoró la eficiencia en distribución, reduciendo horas sin afectar la calidad."
          value={values.Conclusions}
          onChange={handleChange}
          errors={
            errors.Conclusions ? (
              <NeutralBlackText
                text={errors.Conclusions}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <div className="flex flex-row items-center">
          <NumberCircle number={3} />
          <TertiaryTitle text="Detalle de la intervención" className="ml-3" />
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomInputOne
            name="InterventionCompanyName"
            id="InterventionCompanyName"
            title="Nombre de la empresa:"
            placeholder="Carnesanchez S.A."
            value={values.InterventionCompanyName ?? ""}
            onChange={handleChange}
            errors={
              errors.InterventionCompanyName ? (
                <NeutralBlackText
                  text={errors.InterventionCompanyName}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="PrioritisedLineOfIntervention"
            id="PrioritisedLineOfIntervention"
            title="Línea de intervención priorizada:"
            placeholder="Logística de distribución"
            value={values.PrioritisedLineOfIntervention}
            onChange={handleChange}
            errors={
              errors.PrioritisedLineOfIntervention ? (
                <NeutralBlackText
                  text={errors.PrioritisedLineOfIntervention}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="IndicatorsProgress"
            id="IndicatorsProgress"
            title="Avance de indicadores (%):"
            placeholder="90"
            type="number"
            value={values.IndicatorsProgress ?? ""}
            onChange={handleChange}
            errors={
              errors.IndicatorsProgress ? (
                <NeutralBlackText
                  text={errors.IndicatorsProgress}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomInputOne
            name="ActionPlanDuringTheExecutionPeriod"
            id="ActionPlanDuringTheExecutionPeriod"
            title="Plan de acción durante el periodo de ejecución:"
            placeholder="Mejoras tecnológicas en el software."
            value={values.ActionPlanDuringTheExecutionPeriod}
            onChange={handleChange}
            errors={
              errors.ActionPlanDuringTheExecutionPeriod ? (
                <NeutralBlackText
                  text={errors.ActionPlanDuringTheExecutionPeriod}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </div>

        <CustomTextarea
          name="Description:"
          id="Description"
          title="Descripción de las acciones realizadas:"
          placeholder="Optimización de rutas y actualización de inventarios."
          onChange={handleChange}
          errors={
            errors.Description ? (
              <NeutralBlackText
                text={errors.Description}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <CustomTextarea
          name="ComplianceWithResults"
          id="ComplianceWithResults"
          title="Cumplimiento de resultados:"
          placeholder="15% de mejora en tiempos de entrega."
          value={values.ComplianceWithResults}
          onChange={handleChange}
          errors={
            errors.ComplianceWithResults ? (
              <NeutralBlackText
                text={errors.ComplianceWithResults}
                className="text-principal-500"
              ></NeutralBlackText>
            ) : null
          }
        />

        <div className="flex flex-row items-center">
          <NumberCircle number={4} />
          <TertiaryTitle
            text="Identificación de oportunidades"
            className="ml-3"
          />
        </div>

        <Milestones />

        <SectionFiveMonthlyReport />

        <SectionSixMonthlyReport />

        <div className="flex flex-row items-center">
          <NumberCircle number={7} />
          <TertiaryTitle text="Información de facturación" className="ml-3" />
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          <CustomInputOne
            name="HoursRecorded"
            id="HoursRecorded"
            title="Horas registradas:"
            type="number"
            placeholder="5"
            value={values.HoursRecorded ?? ""}
            onChange={handleChange}
            errors={
              errors.HoursRecorded ? (
                <NeutralBlackText
                  text={errors.HoursRecorded}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomPriceInput
            name="ValueBeforeIVA"
            id="ValueBeforeIVA"
            title="Valor Antes de IVA:"
            placeholder=""
            value={values.ValueBeforeIVA}
            onChange={handleChange}
            errors={
              errors.ValueBeforeIVA ? (
                <NeutralBlackText
                  text={errors.ValueBeforeIVA}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomPriceInput
            name="ValueIVA"
            id="ValueIVA"
            title="Valor IVA:"
            placeholder=""
            value={values.ValueIVA ?? ""}
            onChange={handleChange}
            errors={
              errors.ValueIVA ? (
                <NeutralBlackText
                  text={errors.ValueIVA}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />

          <CustomPriceInput
            name="ValueIncludedIVA"
            id="ValueIncludedIVA"
            title="Valor IVA Incluido:"
            placeholder=""
            value={values.ValueIncludedIVA}
            onChange={handleChange}
            errors={
              errors.ValueIncludedIVA ? (
                <NeutralBlackText
                  text={errors.ValueIncludedIVA}
                  className="text-principal-500"
                ></NeutralBlackText>
              ) : null
            }
          />
        </div>

        <SectionSevenMonthlyReport />

        <Button
          type="submit"
          label="Guardar información"
          onClick={() => setOpenModal(true)}
          className="w-56 xl:w-72 self-end my-6"
          primary
        />
      </form>
      {openModal && (
        <Modal
          onClose={() => setOpenModal(false)}
          className={`md:w-[463px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          <Image
            src="/utopia/icons/check_ok.svg"
            alt="Close icon"
            width={80}
            height={80}
            className={`cursor-pointer`}
            priority
          />
          <ModalTitle
            text="¡Información registrada con éxito!"
            className="mt-2"
          />
          <div className="text-principal-450 text-center">
            La información ha sido registrada con éxito.
          </div>
          <div className="flex flex-col w-[70%] space-y-3 py-2">
            <Button
              label="Continuar"
              onClick={() => setOpenModal(false)}
              className="w-full"
              primary
            />
          </div>
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
