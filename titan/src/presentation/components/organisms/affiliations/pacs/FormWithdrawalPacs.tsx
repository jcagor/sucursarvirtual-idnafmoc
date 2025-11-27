import {
  CustomSelectOne,
  NeutralBlackText,
} from "presentation/components/atoms";
import { ChangeEvent, useEffect, type FC } from "react";
import DatePicker, { DateObject, toDateObject } from "react-multi-date-picker";
import { FaCalendarAlt } from "react-icons/fa";
import { FormikProps } from "formik";
import { DEATH_PAC, SelectOption } from "lib";

export type FormWithdrawalPacsValuesType = {
  reasonWithdrawal?: string | undefined;
  affiliationDate?: DateObject | undefined;
  deathDate?: DateObject | undefined;
};

type FormPropsType = {
  reasons: SelectOption[];
  formik: FormikProps<FormWithdrawalPacsValuesType>;
};
export const FormWithdrawalPacs: FC<FormPropsType> = ({ reasons, formik }) => {
  return (
    <div
      className={`flex flex-wrap overflow-y-scroll no-scrollbar w-full py-6`}
    >
      <div className="flex-col">
        <form onSubmit={formik.handleSubmit}>
          {/* fecha de afiliacion y de retiro */}
          <div className="grid grid-cols-2 grid-flow-row gap-3 overflow-hidden">
            <div className="flex flex-wrap w-[calc(324px)]">
              <NeutralBlackText
                className={"text-principal-450"}
                text={"Fecha de Afiliación"}
              />
              <div className="flex flex-row">
                <DatePicker
                  placeholder="Fecha de Afiliación"
                  value={formik.values.affiliationDate}
                  format={"DD | MM | YYYY"}
                  disabled={true}
                  style={{
                    margin: 0,
                    paddingLeft: "15px",
                    color: "#777777",
                    width: "324px",
                    height: "48px",
                    backgroundColor: "#E8E8E8",
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
            </div>
          </div>
          <div className="grid grid-cols-2 grid-flow-row gap-3 overflow-hidden">
            <CustomSelectOne
              label="Motivo de retiro"
              onChange={(val: ChangeEvent<HTMLSelectElement>) => {
                formik.setFieldValue(
                  "reasonWithdrawal",
                  val.target.value,
                  true
                );
              }}
              value={formik.values.reasonWithdrawal}
              options={reasons}
              errors={
                formik.errors.reasonWithdrawal ? (
                  <NeutralBlackText
                    text={formik.errors.reasonWithdrawal}
                    className="text-principal-500"
                  ></NeutralBlackText>
                ) : null
              }
            />
            {/* fecha de fallecimiento */}
            {formik.values.reasonWithdrawal == DEATH_PAC.value && (
              <div className="flex flex-wrap w-[calc(324px)]">
                <NeutralBlackText
                  className={"text-principal-450"}
                  text={"Fecha de Fallecimiento"}
                />
                <div className="flex flex-row">
                  <DatePicker
                    placeholder="Fecha de Fallecimiento"
                    value={formik.values.deathDate}
                    format={"DD | MM | YYYY"}
                    maxDate={toDateObject(new Date())}
                    onChange={(date: DateObject) => {
                      let currentDate: Date = new Date(
                        date.year,
                        date.month.valueOf() - 1,
                        date.day
                      );

                      if (currentDate > new Date()) {
                        return;
                      }
                      formik.setFieldValue("deathDate", date, true);
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
                  {formik.errors.deathDate ? (
                    <NeutralBlackText
                      text={formik.errors.deathDate}
                      className="text-principal-500"
                    ></NeutralBlackText>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
