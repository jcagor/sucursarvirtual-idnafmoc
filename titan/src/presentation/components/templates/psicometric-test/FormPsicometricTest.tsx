"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { PsyTestExamType } from "domain/models/PsyTestExamType";
import FindPsyTestExamUseCase from "domain/usecases/psicometric-test/findPsyTestExam";
import { Formik, Form } from "formik";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import {
  Button,
  NeutralBlackText,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import * as Yup from "yup";
import { YesNoQuestion } from "presentation/components/atoms/common/input/YesNoQuestion";
import { addAlert } from "presentation/store/alert/alertSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalWithChildren } from "presentation/components/atoms/common/modals/ModalWithChildren";
import Image from "next/image";
import SaveSingleAnswerUseCase from "domain/usecases/psicometric-test/saveSingleAnswer.use.case";
import { SingleAswerType } from "domain/models/SingleAswerType";
import ClosePsyTestExamUseCase from "domain/usecases/psicometric-test/closePsyTestExam.use.case";
import { useRouter } from "next/navigation";

export const FormPsicometricTest = ({
  setCurrentForm,
}: {
  setCurrentForm: (form: number) => void;
}) => {
  const [exam, setExam] = useState<PsyTestExamType | undefined>(undefined);
  const router = useRouter();
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);

  useEffect(() => {
    findExam();
  }, []);

  const findExam = async () => {
    const findPsyTestExam = appContainer.get<FindPsyTestExamUseCase>(
      USECASES_TYPES._FindPsyTestExamUseCase
    );
    const response = await findPsyTestExam.execute();
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ocurrio un error al obtener los examenes psicometricos, por favor intente mas tarde.",
          type: "error",
        })
      );
      return;
    }
    setExam(response);
  };

  const saveSingleAnswer = async (answer: SingleAswerType) => {
    const SaveSingleAnswer = appContainer.get<SaveSingleAnswerUseCase>(
      USECASES_TYPES._SaveSingleAnswerUseCase
    );
    const response = await SaveSingleAnswer.execute(answer);
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ocurrio un error al guardar la respuesta, por favor intente mas tarde.",
          type: "error",
        })
      );
      return;
    }
  };

  const handleConfirmModal = async () => {
    const closePsyTestExam = appContainer.get<ClosePsyTestExamUseCase>(
      USECASES_TYPES._ClosePsyTestExamUseCase
    );
    if (!exam) return;
    const response = await closePsyTestExam.execute(exam.id);
    if (!response) {
      dispatch(
        addAlert({
          message:
            "Ocurrio un error al cerrar el examen, por favor intente mas tarde.",
          type: "error",
        })
      );
      return;
    }
    NextForm();
  };

  const NextForm = () => {
    router.push("psicometric-test/results");
  };

  const initialValues: Values = exam
    ? exam.singleAnswers.reduce((acc, q) => {
        acc[q.id.toString()] = q.answer;
        return acc;
      }, {} as Values)
    : ({} as Values);

  const onSubmit = async (values: Values) => {
    setConfirmModal(true);
  };

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text={exam?.examName || "Examen psicométrico"} />
      <p className="text-sm font-light text-principal-180 py-2">
        Diligencia todos los campos, en aquellas preguntas que no aplican para
        la empresa selecciona con N/A.
      </p>
      <SectionSeparator />

      {!exam && <SecondaryText text="Cargando preguntas..." />}

      {exam && (
        <Formik<Values>
          enableReinitialize
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={buildValidationSchema(exam)}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
            submitCount,
          }) => (
            <Form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col gap-4">
                {exam.singleAnswers
                  .slice()
                  .sort((a, b) => a.question.localeCompare(b.question))
                  .map((item) => (
                    <YesNoQuestion
                      key={item.id}
                      name={item.id.toString()}
                      title={item.question}
                      value={values[item.id.toString()]}
                      onChange={(event) => {
                        handleChange(event);
                        saveSingleAnswer({
                          id: item.id,
                          PsyTestQuestions_id: item.PsyTestQuestions_id,
                          question: item.question,
                          answer: event.target.value,
                        });
                      }}
                      onBlur={handleBlur}
                      errors={
                        (touched[item.id.toString()] || submitCount > 0) &&
                        errors[item.id.toString()] ? (
                          <NeutralBlackText
                            text={errors[item.id.toString()] as string}
                            className="text-principal-500"
                          />
                        ) : null
                      }
                    />
                  ))}
              </div>

              <Button
                label="Guardar respuestas"
                type="submit"
                className="w-56 xl:w-72 my-6 self-end"
                primary
              />
            </Form>
          )}
        </Formik>
      )}
      {confirmModal && (
        <ModalWithChildren
          onClose={() => setConfirmModal(false)}
          className="w-96 flex flex-col items-center"
        >
          <Image
            src="/icons/comprobacion.png"
            alt="Close icon"
            width={90}
            height={90}
          />
          <p className="text-principal-180 text-center my-4">
            Confirma que deseas guardar tus respuestas, no se podra editar las
            respuestas.
          </p>
          <Button
            label="Continuar"
            onClick={async () => {
              setConfirmModal(false);
              setLoadingModal(true);
              await handleConfirmModal();
            }}
            className="w-full"
            primary
          />
        </ModalWithChildren>
      )}
      {loadingModal && (
        <ModalWithChildren
          onClose={() => {}}
          className="w-96 flex flex-col items-center"
        >
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-principal-180 transition-all duration-500" />
            <div className="text-principal-180 mt-2">Cargando...</div>
          </>
        </ModalWithChildren>
      )}
    </div>
  );
};

export type Values = Record<string, boolean | null>;

export const buildValidationSchema = (exam: PsyTestExamType) => {
  const shape: Record<string, Yup.AnySchema> = {};

  exam.singleAnswers.forEach((q) => {
    shape[q.id.toString()] = Yup.boolean()
      .nullable()
      .required("Debes seleccionar una opción");
  });

  return Yup.object().shape(shape) as unknown as Yup.ObjectSchema<
    Record<string, boolean | null>
  >;
};
