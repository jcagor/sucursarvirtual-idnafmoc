"use client";

import { useState, type FC, useEffect } from "react";

import { useSession } from "next-auth/react";
import { FiledDetailsCardInterface } from "lib/types/table";
import {
  AUTHENTICATED_STATUS,
  formatDateInMonth,
  generateUniqueKey,
  getFiledStatus,
  REJECTION_REQUEST_UPDATE_TYPE,
} from "lib";
import dayjs from "lib/helpers/dayjsTimeZone";
import {
  AffiliatedProccesedCard,
  DynamicCard,
  FiledInfoSection,
  FilesCard,
  RedirecCardProperty,
  ScrollZone,
} from "presentation/components/molecules";
import {
  Button,
  LoadedFile,
  MainTitle,
  NeutralBlackText,
  NeutralText,
  SectionSeparator,
} from "presentation/components/atoms";
import { Conditional } from "lib/directives";
import { RedirectCardList } from "../../common";
import { useRouter } from "next/navigation";
import {
  Attachment,
  IFindAllRequestAuditFiltersDto,
  IResponseFindAllRequestsAuditsDto,
  MassiveAttachmentAudit,
} from "domain/models";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import DownloadFilesUseCase from "domain/usecases/Files/downloadFiles.use.case";
import FindMassiveAttachmentByFiled from "domain/usecases/attachment/findMassiveAttachmentByFiled.use.case";
import GenerateCertificateUseCase from "domain/usecases/certificate/GenerateCertificate.use.case";
import FindAllRequestsAuditsUseCase from "domain/usecases/request/findAllRequestsAudits.use.case";

const FiledDetailsCard: FC<FiledDetailsCardInterface> = ({
  bodyMessage,
  filedId,
  scrollZoneContent,
  secondBodyMessage,
  thridBodyMessage,
  filedInforSection,
  basePath = true,
  requestInfo,
}) => {
  const router = useRouter();

  const findMassiveAttachmentByFiledId =
    appContainer.get<FindMassiveAttachmentByFiled>(
      USECASES_TYPES._FindMassiveAttachmentByFiledIdUseCase
    );
  const downloadFile = appContainer.get<DownloadFilesUseCase>(
    USECASES_TYPES._DownloadFileUseCase
  );

  const generateCertificate = appContainer.get<GenerateCertificateUseCase>(
    USECASES_TYPES._GenerateCertificateUseCase
  );

  const findAllRequestsAuditsUseCase =
    appContainer.get<FindAllRequestsAuditsUseCase>(
      USECASES_TYPES._FindAllRequestsAuditsUseCase
    );

  const [quantityData, setQuantityData] = useState<MassiveAttachmentAudit>();
  const [filedStatusName, setFiledStatusName] = useState<string>("");
  const [buttonList, setButtonList] = useState<RedirecCardProperty[]>([]);
  const [isGenerate, setIsGenerate] = useState<boolean>(false);
  const [audits, setAudits] = useState<IResponseFindAllRequestsAuditsDto[]>([]);

  const { data: session, status: sessionStatus } = useSession();

  /**
   * This method gets the audits records for the request selected
   */
  const getAudits = async () => {
    const filtersRequestToGetAudits: IFindAllRequestAuditFiltersDto = {
      type: REJECTION_REQUEST_UPDATE_TYPE,
    };

    const audits = await findAllRequestsAuditsUseCase.execute(
      filedInforSection.rightTextDesc ?? "",
      filtersRequestToGetAudits,
      session?.access_token
    );

    setAudits(audits ?? []);
  };

  const download = async (key: string) => {
    if (!(sessionStatus == AUTHENTICATED_STATUS)) {
      return;
    }
    return await downloadFile.execute(key, session.access_token);
  };

  const generate = async () => {
    setIsGenerate(true);
    if (!(sessionStatus == AUTHENTICATED_STATUS) || !filedId) {
      return;
    }
    try {
      if (Object.keys(requestInfo).length === 0) {
        setIsGenerate(false);
        return;
      }
      const blob = await generateCertificate.execute(
        filedId,
        filedInforSection.firstDescription.split(":")[1],
        filedInforSection.status
          ? getFiledStatus(filedInforSection.status)
          : "",
        filedInforSection.secondDescription
          ? filedInforSection.secondDescription.split(":")[1]
          : "",
        filedInforSection.rightTextDesc ?? "",
        requestInfo,
        session.access_token
      );
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "mi_comprobante.pdf"); // Nombre del archivo a descargar
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
    }
    setIsGenerate(false);
  };

  const getData = async () => {
    if (!(sessionStatus == AUTHENTICATED_STATUS)) {
      return;
    }

    const getAttachmentData = await findMassiveAttachmentByFiledId.execute(
      session.access_token,
      filedId,
      filedInforSection.rightTextDesc
    );

    if (!getAttachmentData) {
      return { massiveAttachment: {} };
    }

    if (getAttachmentData.isAudit) {
      // Sets the attachment as audit attachment
      const attachment = getAttachmentData.data as MassiveAttachmentAudit;
      const newButtonList: any = [];

      if (!attachment.attachment) {
        setButtonList(newButtonList);
        return;
      }

      setQuantityData(attachment);
      newButtonList.push({
        description: `Descargar ${attachment.attachment?.[0].attachmentTypes?.description}`,
        icon: (
          <LoadedFile
            className={"relative w-32 left-[calc(10px)] bottom-[calc(0px)] z-0"}
            basePath={basePath}
          />
        ),
        shadowColor: "shadow-none",
        cardClassName: "w-[calc(250px)] shadow-md",
        onChange: async () => {
          const radicatedFile = await download(
            `requests/${filedInforSection.rightTextDesc}/${
              attachment?.attachment?.[0].fileURL ?? ""
            }`
          );
          if (radicatedFile) {
            router.push(radicatedFile);
          }
        },
      });
      if (
        attachment?.attachment?.[1].fileURL != undefined &&
        attachment?.attachment?.[1].fileURL.trim() != ""
      ) {
        newButtonList.push({
          description: `Descargar ${
            attachment.attachment?.[1].attachmentTypes?.description ??
            " radicado procesado"
          } `,
          icon: (
            <LoadedFile
              className={
                "relative w-32 left-[calc(10px)] bottom-[calc(0px)] z-0"
              }
              basePath={basePath}
            />
          ),
          shadowColor: "shadow-none",
          cardClassName: "w-[calc(250px)] shadow-md",
          onChange: async () => {
            const radicatedFile = await download(
              `requests/${filedInforSection.rightTextDesc}/${
                attachment?.attachment?.[1].fileURL ?? ""
              }`
            );

            if (radicatedFile) {
              router.push(radicatedFile);
            }
          },
        });
      }
      setButtonList(newButtonList);
      setIsGenerate(false);
      return;
    }
    // Sets the attachment as attachment array

    const attachment = getAttachmentData.data as Attachment[];

    const newButtonList = [];
    for (let index = 0; index < attachment.length; index++) {
      const element = attachment[index];
      newButtonList.push({
        description: `${element.attachmentTypes?.description}`,
        icon: (
          <LoadedFile
            className={"relative w-32 left-[calc(10px)] bottom-[calc(0px)] z-0"}
            basePath={basePath}
          />
        ),
        shadowColor: "shadow-none",
        cardClassName: "w-[calc(250px)] shadow-md",
        onChange: async () => {
          const radicatedFile = await download(
            `requests/${filedInforSection.rightTextDesc}/${
              element.fileURL ?? ""
            }`
          );

          if (radicatedFile) {
            router.push(radicatedFile);
          }
        },
      });
    }

    setButtonList(newButtonList);
    setIsGenerate(false);
  };

  const init = async () => {
    await getData();
    await getAudits();
    if (filedInforSection.status) {
      setFiledStatusName(getFiledStatus(filedInforSection.status) ?? "");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className={`flex flex-wrap overflow-x-auto w-full  rounded-xl p-6`}>
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
      <NeutralBlackText
        text={bodyMessage}
        className="w-full text-xl text-center"
      />
      <Conditional showWhen={secondBodyMessage ? true : false}>
        <NeutralBlackText
          text={secondBodyMessage!}
          className="w-full text-xl text-center"
        />
      </Conditional>
      <Conditional showWhen={thridBodyMessage ? true : false}>
        <NeutralBlackText
          text={thridBodyMessage!}
          className="w-full text-xl text-center"
        />
      </Conditional>
      <div className="flex flex-wrap self-center justify-center w-full">
        <Conditional showWhen={audits?.length > 0}>
          <div className="flex flex-wrap self-center justify-center w-[calc(50%)] h-[calc(200px)]">
            <ScrollZone className="m-2">
              {audits.length > 0 &&
                audits.map((auditRecord, index) => {
                  const formatedDateUtc = dayjs
                    .utc(auditRecord.createdAt)
                    .format("YYYY-MM-DD HH:mm:ss");

                  const formatedDate = formatDateInMonth(
                    new Date(formatedDateUtc)
                  );
                  return (
                    <div key={auditRecord.id} className="flex flex-col">
                      <NeutralBlackText
                        text={`${formatedDate}`}
                        className="text-principal-180"
                      />
                      <NeutralBlackText text={`${auditRecord.action}`} />
                    </div>
                  );
                })}
            </ScrollZone>
          </div>
        </Conditional>
      </div>
      <div className="flex w-full self-center justify-center">
        <DynamicCard content={requestInfo} classname=" w-4/5 mb-2 mt-2" />
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

      <div className="flex flex-wrap flex-col w-full my-4">
        {buttonList.length > 0 && (
          <NeutralText
            className="font-outfit text-sm font-bold text-principal-180 justify-self-center text-center mb-4 "
            text="Documentos de soporte, selecciona cual deseas descargar:"
          />
        )}

        <div className="w-full justify-items-center grid xl:grid-cols-2 sm:grid-cols-1 2md:grid-cols-2 gap-4 my-4">
          {buttonList.map((data) => {
            return (
              <FilesCard
                key={generateUniqueKey()}
                description={data.description}
                icon={data.icon}
                shadowColor={data.shadowColor}
                onChange={data.onChange}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { FiledDetailsCard };
