"use client";
import React, { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { FaCalendarAlt } from "react-icons/fa";
import { DATE_PICKER_MONTHS, DATE_PICKER_WEEK_DAYS } from "lib";

type WeekPickerComponentProps = {
  value?: [Date, Date];
  onChange: (newValue: [Date, Date]) => void;
  format?: string;
  className?: string;
};

export const WeekPicker: React.FC<WeekPickerComponentProps> = ({
  value,
  format,
  onChange,
  className,
}) => {
  const weekDays = DATE_PICKER_WEEK_DAYS;
  const months = DATE_PICKER_MONTHS;

  const getWeekRange = (date: DateObject): [DateObject, DateObject] => {
    const dayOfWeek = date.weekDay.index;
    const startOfWeek = new DateObject(date)
      .set("hour", 0)
      .set("minute", 0)
      .set("second", 0)
      .set("millisecond", 0)
      .subtract(dayOfWeek === 0 ? 6 : dayOfWeek - 1, "days");
    const endOfWeek = new DateObject(startOfWeek).add(6, "days");
    return [startOfWeek, endOfWeek];
  };

  const initialRange: [DateObject, DateObject] = getWeekRange(new DateObject());
  const [selectedValue, setSelectedValue] = useState<[DateObject, DateObject]>(
    value ? [new DateObject(value[0]), new DateObject(value[1])] : initialRange
  );

  useEffect(() => {
    onChange([selectedValue[0].toDate(), selectedValue[1].toDate()]);
  }, [selectedValue]);

  const handleWeekChange = (date: DateObject | DateObject[] | null) => {
    if (!date) return;
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const weekRange = getWeekRange(selectedDate);
    setSelectedValue(weekRange);
  };

  return (
    <div className={`flex flex-wrap items-start flex-col ${className ?? ""}`}>
      <div className="w-full flex flex-row">
        <DatePicker
          className="w-full"
          containerClassName="w-full"
          inputClass="w-full"
          weekDays={weekDays}
          months={months}
          format={format ?? "DD | MM | YYYY"}
          value={selectedValue}
          range
          onChange={handleWeekChange}
          style={{
            margin: 0,
            paddingLeft: "15px",
            color: "#777777",
            height: "48px",
            borderWidth: "1px",
            fontFamily: "Outfit",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "19px",
          }}
        />
        <div className="flex flex-wrap self-center justify-items-center ml-[calc(-25px)]">
          <FaCalendarAlt className="text-principal-330 " />
        </div>
      </div>
    </div>
  );
};
