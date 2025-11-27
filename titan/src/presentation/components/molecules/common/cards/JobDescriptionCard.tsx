"use client";
import Image from "next/image";
import { Button, CardText, NeutralNCText, NeutralText } from "presentation";
import React, { useEffect, useRef, useState } from "react";
import { OpenJob } from "lib";

interface Props {
  openJob: OpenJob;
  postulationFn: Function;
  postulated: boolean;
  ellipseUrl?: string;
  ellipseClassname?: string;
  loading?: boolean;
}

export const JobDescriptionCard = ({
  openJob,
  postulationFn = () => {
    console.error("postulation function undefined");
  },
  postulated = false,
  ellipseUrl = "",
  ellipseClassname = "",
  loading = false,
}: Props) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  const [queryPending, setQueryPending] = useState(false);

  const formatCurrency = (salary: number) => {
    let formatSalary = Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(salary);

    return `${formatSalary.replace(",00", "")}`;
  };

  const queryPostulation = async () => {
    setQueryPending(true);
    const postulationQuery = await postulationFn(openJob);
    setQueryPending(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("lottie-web/build/player/lottie_light").then((lottie: any) => {
      if (animationContainer.current) {
        const anim = lottie.loadAnimation({
          container: animationContainer.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: require("/public/animations/spinner.json"),
        });

        return () => anim.destroy();
      }
    });
  }, []);

  return (
    <div
      className={
        "mt-2 p-4 bg-[#FFF] block rounded-xl menuCardShadow relative items-center"
      }
    >
      <>
        <NeutralText
          text={openJob.title}
          fontSize="2xl"
          className={
            "w-full pr-8 text-start items-start justify-start md:pr-8 font-semibold text-[#777]"
          }
        />

        <NeutralNCText
          text={openJob.businessName + " / " + openJob.city}
          fontSize="md"
          className={
            "w-full pr-8 text-start items-start justify-start md:pr-8 text-[#777]"
          }
        />

        <div className="mt-5 pr-8 md:pr-8 flex">
          <Image
            src={"/icons/salary_icon.png"}
            alt="Salary image"
            width={20}
            height={20}
            draggable={false}
            className="flex"
          />

          <NeutralText
            text={`${openJob.monthSalary} COP`} //${formatCurrency(+openJob.monthSalary)}
            className={
              "w-full flex text-start font-normal items-start text-md text-[#1E1E1E]"
            }
          />
        </div>

        <div className="mt-5 pr-8 md:pr-8 flex">
          <Image
            src={"/icons/time_icon.png"}
            alt="Time image"
            width={20}
            height={20}
            draggable={false}
            className="flex"
          />
          <NeutralText
            text={openJob.jobSchedule}
            className={
              "w-full flex text-start font-normal items-start text-md text-[#1E1E1E]"
            }
          />
        </div>

        <div className="mt-5 pr-8 md:pr-8 flex">
          <Image
            src={"/icons/job_icon.png"}
            alt="Job image"
            width={20}
            height={20}
            draggable={false}
            className="flex"
          />
          {openJob.jobRequirements.map((req, idx, arr) => {
            return (
              <NeutralText
                key={"job-req-" + idx}
                text={
                  idx + 1 === arr.length ? ` ${req.label}.` : ` ${req.label},`
                }
                className={
                  "flex text-start font-normal items-start text-md text-[#1E1E1E]"
                }
              />
            );
          })}
        </div>

        <div className="mt-5 pr-8 md:pr-8 flex">
          <Image
            src={"/icons/location_icon.png"}
            alt="Location image"
            width={20}
            height={20}
            draggable={false}
            className="flex"
          />
          <NeutralText
            text={`${openJob.city}, ${openJob.state}`}
            className={
              "w-full flex text-start font-normal items-start text-md text-[#1E1E1E]"
            }
          />
        </div>

        <div className="my-2">
          <Button
            label={postulated ? "Postulado" : "Postularme"}
            type="submit"
            primary={!postulated}
            className="w-56 xl:w-72 my-6 self-end"
            onClick={
              postulated
                ? () => {}
                : () => {
                    queryPostulation();
                  }
            }
            isLoading={queryPending}
          />
        </div>

        <NeutralText
          text={"Descripción completa del empleo"}
          fontSize="lg"
          className={
            "w-full block font-semibold mt-5 pr-8 justify-start md:pr-8 text-[#777]"
          }
        />

        <NeutralText
          text={openJob.description}
          fontSize="md"
          className={"w-full block mt-5 pr-8 justify-start md:pr-8 text-[#777]"}
        />

        <NeutralText
          text={"¿Por qué te necesitamos?"}
          fontSize="md"
          className={
            "w-full block font-semibold mt-5 pr-8 justify-start md:pr-8 text-[#777]"
          }
        />

        <NeutralText
          text={openJob.activityDetails}
          fontSize="md"
          className={"w-full block mt-5 pr-8 justify-start md:pr-8 text-[#777]"}
        />

        <NeutralText
          text={`Horario: ${openJob.jobSchedule}`}
          fontSize="md"
          className={"w-full block mt-5 pr-8 justify-start md:pr-8 text-[#777]"}
        />

        <NeutralText
          text={`Tipo de Contrato: ${openJob.incorporationType}`}
          fontSize="md"
          className={"w-full block mt-5 pr-8 justify-start md:pr-8 text-[#777]"}
        />

        <NeutralText
          text={`Modalidad:  ${openJob.jobLocation}`}
          fontSize="md"
          className={"w-full block mt-5 pr-8 justify-start md:pr-8 text-[#777]"}
        />

        <div className="my-10">{/** bottom padding */}</div>
      </>
    </div>
  );
};
