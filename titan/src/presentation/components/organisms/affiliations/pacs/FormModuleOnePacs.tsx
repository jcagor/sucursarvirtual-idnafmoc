import {
  Conditional,
  KINDSHIP,
  KINDSHIP_SPOUCE_VALUE,
  ONE_ANSWER,
  ONLY_NUMBERS_REGEXP,
  SelectOption,
} from "lib";
import {
  CustomInputOne,
  CustomSelectOne,
  NeutralBlackText,
  SearchSelectorAndTextInput,
} from "presentation/components/atoms";
import { ChangeEvent, type FC } from "react";
import DatePicker, { DateObject, toDateObject } from "react-multi-date-picker";
import { FaCalendarAlt } from "react-icons/fa";
import { FormikProps } from "formik";
import { useAppSelector } from "presentation/store";

export type FormModuleOnePacsValuesType = {
  kindship?: string | undefined;
  bornDate?: DateObject | undefined;
  documentType?: string | undefined;
  document?: string | undefined;
  disability?: string | undefined;
};

type FormPropsType = {
  documentTypes: SelectOption[];
  formik: FormikProps<FormModuleOnePacsValuesType>;
};
export const FormModuleOnePacs: FC<FormPropsType> = ({
  documentTypes,
  formik,
}) => {
  const rnecState = useAppSelector((state) => state.rnec.stateRnec);
  // Change the document type and document value
  const onChangeIdentification = (event: any) => {
    if (event.type == "select") {
      const selected = documentTypes.find(
        (obj) => obj.value === event.value.target.value
      );
      formik.setFieldValue("documentType", selected?.value, true);
    } else if (event.type == "input") {
      formik.setFieldValue("document", event.value, false);
    }
  };

  return (
    <div
      className={`flex flex-wrap overflow-y-scroll no-scrollbar w-full py-6`}
    >
      <div className="flex-col">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 2lg:grid-cols-2 grid-flow-row gap-3 overflow-hidden">
            <CustomSelectOne
              id="kindship"
              label="Parentesco"
              placeholder=""
              onChange={async (val: ChangeEvent<HTMLSelectElement>) => {
                await formik.setFieldValue("kindship", val.target.value, false);
              }}
              value={formik.values.kindship}
              options={KINDSHIP}
              errors={
                formik.errors.kindship ? (
                  <NeutralBlackText
                    text={formik.errors.kindship}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <div
              className={`w-[calc(324px)] ${
                formik.errors.bornDate ? " h-[calc(108px)]" : " h-[calc(68px)]"
              }`}
            >
              <NeutralBlackText
                className={"text-principal-450"}
                text={"Fecha de nacimiento"}
              />
              <div className="flex flex-row">
                <DatePicker
                  disabled={rnecState === "SUCCESS"}
                  placeholder="Fecha de nacimiento"
                  value={formik.values.bornDate}
                  format={"DD | MM | YYYY"}
                  maxDate={toDateObject(new Date())}
                  inputMode="none"
                  onChange={(date: DateObject) => {
                    if (!date) {
                      return;
                    }
                    let currentDate: Date = new Date(
                      date.year,
                      date.month.valueOf() - 1,
                      date.day
                    );

                    if (currentDate > new Date()) {
                      return;
                    }
                    formik.setFieldValue("bornDate", date, false);
                  }}
                  style={{
                    margin: 0,
                    paddingLeft: "15px",
                    color: "#777777",
                    width: "324px",
                    height: "48px",
                    backgroundColor: "#FFFFFF",
                    borderWidth: "1px",
                    borderColor: "#777777",
                    fontFamily: "Outfit",
                    fontSize: "15px",
                    fontWeight: "400",
                    lineHeight: "19px",
                  }}
                />
                <div className="flex flex-wrap w-full self-center justify-items-center ml-[calc(-25px)]">
                  <FaCalendarAlt className="text-principal-330 " />
                </div>
              </div>
              <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
                {formik.errors.bornDate ? (
                  <NeutralBlackText
                    text={formik.errors.bornDate}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null}
              </div>
            </div>

            <CustomSelectOne
              disabled={rnecState === "SUCCESS"}
              placeholder="Tipo de documento"
              label="Tipo de documento"
              value={formik.values.documentType}
              onChange={(val) => {
                formik.setFieldValue("documentType", val.target.value, false);
              }}
              options={documentTypes}
              errors={
                formik.errors.documentType ? (
                  <NeutralBlackText
                    text={formik.errors.documentType}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />

            <CustomInputOne
              disabled={rnecState === "SUCCESS"}
              label="Número de documento"
              value={formik.values.document}
              onChange={(val) => {
                const onlyNumbers = val.target.value.replace(/\D/g, ""); //
                formik.setFieldValue("document", val.target.value, false);
              }}
              errors={
                formik.errors.document ? (
                  <NeutralBlackText
                    text={formik.errors.document}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            <Conditional
              showWhen={formik.values.kindship != KINDSHIP_SPOUCE_VALUE}
            >
              <CustomSelectOne
                placeholder="Cuenta con alguna discapacidad"
                label="Cuenta con alguna discapacidad"
                value={formik.values.disability}
                onChange={(val) => {
                  formik.setFieldValue("disability", val.target.value, false);
                }}
                options={ONE_ANSWER}
                errors={
                  formik.errors.disability ? (
                    <NeutralBlackText
                      text={formik.errors.disability}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null
                }
              />
            </Conditional>
          </div>
        </form>
      </div>
    </div>
  );
};
