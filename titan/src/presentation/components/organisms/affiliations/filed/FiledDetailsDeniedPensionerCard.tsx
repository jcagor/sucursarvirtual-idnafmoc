"use client";

import { useEffect, useState, type FC } from "react";

import { MassiveAttachmentAudit } from "domain/models";
import { AUTHENTICATED_STATUS, getFiledStatus } from "lib";
import { Conditional } from "lib/directives";
import { FiledDetailsCardInterface } from "lib/types/table";
import { useSession } from "next-auth/react";
import {
  Button,
  NeutralBlackText,
  SectionSeparator,
} from "presentation/components/atoms";
import {
  AffiliatedProccesedCard,
  FiledInfoSection,
  RedirecCardProperty,
  ScrollZone,
} from "presentation/components/molecules";
import { RedirectCardList } from "../../common";

const FiledDetailsDeniedPensionerCard: FC<FiledDetailsCardInterface> = ({
  bodyMessage,
  filedId,
  scrollZoneContent,
  secondBodyMessage,
  thridBodyMessage,
  filedInforSection,
  basePath = true,
  onPressBackButton,
  request,
}) => {
  const [quantityData, setQuantityData] = useState<MassiveAttachmentAudit>();
  const [filedStatusName, setFiledStatusName] = useState<string>("");
  const [buttonList, setButtonList] = useState<RedirecCardProperty[]>([]);

  const { status: sessionStatus } = useSession();

  const getData = async () => {
    if (!(sessionStatus == AUTHENTICATED_STATUS)) {
      return;
    }
    return { massiveAttachment: {} };
  };

  const init = async () => {
    await getData();
    if (filedInforSection.status) {
      setFiledStatusName(getFiledStatus(filedInforSection.status) ?? "");
    }
  };

  useEffect(() => {
    init();
  }, []);

  const getMessageError = (): {
    message: string;
    date: string;
  } => {
    const errorMessage = request?.requestsAudit?.find(
      (audit: { type: string; action: string }) => {
        if (audit) {
          return audit?.type == "rejection-approval-workflow";
        }
        return null;
      }
    ) as { type: string; action: string; createdAt: string } | undefined;
    return {
      message: errorMessage?.action ?? "",
      date: errorMessage?.createdAt ?? "",
    };
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12

    return `${day} ${month} ${year} - ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div
      className={`flex flex-wrap overflow-y-auto w-full  rounded-xl p-6 max-h-[80vh]`}
    >
      <FiledInfoSection
        firstDescription={filedInforSection.firstDescription}
        mainTitle={filedInforSection.mainTitle}
        rightTextDesc={filedInforSection.rightTextDesc}
        rightTextTitle={filedInforSection.rightTextTitle}
        secondDescription={filedInforSection.secondDescription}
        status={filedStatusName}
        ClassNameStatus={filedInforSection.ClassNameStatus}
      />
      <SectionSeparator className="w-full mt-14 mb-14" />
      <div className="mx-auto w-full flex flex-col gap-4 items-center">
        <div className="flex flex-col items-center">
          <h3 className="text-principal-350">
            Hemos recibido tu solicitud y estamos trabajando en ella.
          </h3>
          <h3 className="text-principal-350">
            Este procedimiento puede tomar unos minutos.
          </h3>
        </div>
        <div className="w-full mx-auto max-w-[500px] bg-principal-300 rounded-xl p-6 flex flex-col gap-4 text-center items-center min-h-[200px] max-h-[300px] overflow-y-auto">
          <h4 className="text-principal-120 font-semibold">
            {formatDate(getMessageError().date)}
          </h4>
          <NeutralBlackText text={getMessageError().message} />
        </div>
        <div className="w-full max-w-[600px]">
          <span className="text-principal-120 font-semibold">
            Nombres y apellidos:{" "}
          </span>
          <span className="text-principal-350">
            {request?.userFullName ?? ""}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap self-center justify-center w-full">
        <Conditional
          showWhen={
            scrollZoneContent?.length
              ? scrollZoneContent?.length > 0
                ? true
                : false
              : false
          }
        >
          <div className="flex flex-wrap self-center justify-center w-[calc(50%)] h-[calc(200px)]">
            <ScrollZone className="m-2">
              {scrollZoneContent?.map((scrollZoneContent, index) => (
                <NeutralBlackText
                  key={index}
                  text={`${index + 1}. ${scrollZoneContent}`}
                />
              ))}
            </ScrollZone>
          </div>
        </Conditional>
      </div>
      {quantityData?.proccesed && (
        <div className="flex flex-wrap w-full h-32 justify-center mt-6 mb-[calc(-45px)]">
          <AffiliatedProccesedCard
            exitQuantity={quantityData?.withoutError}
            failedQuantity={quantityData?.withError}
            proccesedQuantity={quantityData?.proccesed}
          />
        </div>
      )}

      <div className="flex flex-wrap w-full my-14">
        <RedirectCardList
          className="flex w-full justify-center"
          redirectButtons={buttonList}
        />
      </div>
      <div className="flex w-full justify-end">
        <div className="flex w-1/5">
          <Button onClick={onPressBackButton} label="Volver" primary={true} />
        </div>
      </div>
    </div>
  );
};

export { FiledDetailsDeniedPensionerCard };
