"use client";

import { AppointmentType } from "domain/models";
import { useEffect, useState } from "react";

interface DayPlanner {
  name: string;
  day: string;
  hours: { hour: string; attendance: string; date: Date }[];
}

type WeekPlannerType = DayPlanner[];

type WeekPlannerProps = {
  selectedWeek: [Date, Date];
  setSelectedHour: (date: Date) => void;
  appointments: AppointmentType[];
};

export const WeekPlanner: React.ForwardRefRenderFunction<
  HTMLInputElement,
  WeekPlannerProps
> = ({ selectedWeek, appointments, setSelectedHour }) => {
  const generateWeek = (weekRange: [Date, Date]): WeekPlannerType => {
    const daysOfWeek = [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];

    return daysOfWeek.map((name, index) => {
      const currentDate = new Date(weekRange[0]);
      currentDate.setUTCDate(currentDate.getUTCDate() + index);

      return {
        name,
        day: currentDate.toLocaleDateString("es-ES", { day: "2-digit" }),
        hours: Array.from({ length: 24 }, (_, i) => {
          const hourDate = new Date(
            Date.UTC(
              currentDate.getUTCFullYear(),
              currentDate.getUTCMonth(),
              currentDate.getUTCDate(),
              i,
              0,
              0,
              0
            )
          );

          return {
            hour: `${String(i).padStart(2, "0")}:00`,
            attendance: "",
            date: hourDate,
          };
        }),
      };
    });
  };

  const [weekPlanner, setWeekPlanner] = useState<WeekPlannerType>(
    generateWeek(selectedWeek)
  );

  const updateAttendance = (
    weekData: WeekPlannerType,
    appointments: AppointmentType[]
  ): WeekPlannerType => {
    return weekData.map((day) => ({
      ...day,
      hours: day.hours.map((hour) => {
        const match = appointments.find((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate.getTime() === hour.date.getTime();
        });

        return match ? { ...hour, attendance: match.attendance } : hour;
      }),
    }));
  };

  useEffect(() => {
    const week = generateWeek(selectedWeek);
    const updatedWeekData = updateAttendance(week, appointments);
    setWeekPlanner(updatedWeekData);
  }, [appointments, selectedWeek]);

  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-7 gap-4 xl:gap-8 md:pr-4">
        {weekPlanner?.map((dayPlanner, index) => (
          <div
            key={index}
            className="flex flex-col items-center py-2 rounded-t-lg gap-2 bg-principal-150 text-principal-450"
          >
            <div>{dayPlanner.name}</div>
            <div className="font-bold mb-2 text-2xl text-principal-350">
              {dayPlanner.day}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full grid grid-cols-7 gap-4 xl:gap-8 md:pr-4 max-h-40 overflow-y-auto">
        {weekPlanner?.map((day) => (
          <DayPlanner
            key={day.day}
            dayPlanner={day}
            onHourClick={(date) => {
              setSelectedHour(date);
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface DayPlannerProps {
  dayPlanner: DayPlanner;
  onHourClick: (date: Date) => void;
}

const DayPlanner: React.FC<DayPlannerProps> = ({ dayPlanner, onHourClick }) => {
  return (
    <div className="flex flex-col pb-2 items-center rounded-b-lg gap-3 bg-principal-150 text-principal-450">
      {dayPlanner.hours?.map(({ hour, attendance, date }, index) => (
        <div
          key={index}
          className={`flex flex-col items-center px-3 py-2 rounded-xl bg-opacity-10 ${
            attendance === "Assigned"
              ? "bg-principal-120"
              : attendance === "Absent"
              ? "bg-principal-500"
              : attendance === "Attended"
              ? "bg-principal-700"
              : ""
          }`}
          onClick={() => onHourClick(date)}
          onKeyDown={(e) => {}}
        >
          <span
            className={`${
              attendance === "Assigned"
                ? "text-principal-120"
                : attendance === "Absent"
                ? "text-principal-500"
                : attendance === "Attended"
                ? "text-principal-700"
                : ""
            }`}
          >
            {hour}
          </span>
          {attendance !== "" && (
            <div
              className={`w-1 h-1 rounded-full ${
                attendance === "Assigned"
                  ? "bg-principal-120"
                  : attendance === "Absent"
                  ? "bg-principal-500"
                  : attendance === "Attended"
                  ? "bg-principal-700"
                  : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};
