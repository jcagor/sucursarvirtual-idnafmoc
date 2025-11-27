"use client";

import { AppointmentType } from "domain/models/Appointment/AppointmentType";
import { color } from "framer-motion";
import { APPOINTMENT_ATTENDANCE } from "lib";
import { useEffect, useRef, useState } from "react";

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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 370;
    }
  }, []);

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
      <div ref={scrollRef} className="h-60 overflow-y-auto">
        <div className="w-full grid grid-cols-7 gap-4 xl:gap-8">
          {weekPlanner?.map((dayPlanner, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 bg-principal-150 text-principal-450 rounded-lg"
            >
              <div className="sticky top-0 bg-principal-150 z-5 w-full flex flex-col items-center pt-2 rounded-t-lg">
                <div>{dayPlanner.name}</div>
                <div className="font-bold mb-2 text-2xl text-principal-350">
                  {dayPlanner.day}
                </div>
              </div>
              <DayPlanner
                dayPlanner={dayPlanner}
                onHourClick={(date) => {
                  setSelectedHour(date);
                }}
              />
            </div>
          ))}
        </div>
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
    <div className="flex flex-col pb-2 items-center rounded-b-lg gap-3 text-principal-450">
      {dayPlanner.hours?.map(({ hour, attendance, date }, index) => {
        const attendanceInfo = APPOINTMENT_ATTENDANCE.find(
          (a) => a.attendace === attendance
        );

        return (
          <div
            key={index}
            className={`flex flex-col items-center px-3 py-2 rounded-xl`}
            style={{ backgroundColor: attendanceInfo?.bg_color || "" }}
            onClick={() => onHourClick(date)}
            onKeyDown={(e) => {}}
          >
            <span style={{ color: attendanceInfo?.text_color || "" }}>
              {hour}
            </span>
            {attendance !== "" && (
              <div
                className={`w-1 h-1 rounded-full`}
                style={{ backgroundColor: attendanceInfo?.text_color || "" }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
