"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import {
  PendingTechRecordSign,
  PendingTechRecordSignList,
} from "domain/models";
import GetTechRecordSignListUseCase from "domain/usecases/techAssistance/getTechRecordSignList";
import { USECASES_TYPES } from "infrastructure/ioc/containers/usecases/usecases.types";
import { appContainer } from "infrastructure/ioc/inversify.config";
import { jwtDecode } from "jwt-decode";
import { PENDING_SIGN_TECH_RECORDS_PER_PAGE } from "lib";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NeutralNCText, SectionSeparator } from "presentation";
import {
  Column,
  DataTable,
} from "presentation/components/atoms/common/table/DataTable";
import { useEffect, useState } from "react";

export const TechRecordSignListTemplate = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [reports, setReports] = useState<PendingTechRecordSignList>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const previousSteep = () => {
    router.push("/");
  };

  // PAGINATION
  const [cardPage, setCardPage] = useState(1);

  const navigateOffersForward = () => {
    //console.log("fw");
    if (reports) {
      if (
        reports?.length > 0 &&
        cardPage * PENDING_SIGN_TECH_RECORDS_PER_PAGE < reports?.length
      ) {
        setCardPage((prevState) => {
          return prevState + 1;
        });
        //console.log("page:", cardPage);
      }
    }
  };

  const navigateOffersBackwards = () => {
    //console.log("bk");
    if (reports) {
      if (reports.length > 0 && cardPage > 1) {
        setCardPage((prevState) => {
          return prevState - 1;
        });
        //console.log("page:", cardPage);
      }
    }
  };

  const getBusinessReportList = async () => {
    setLoading(true);
    const token = session?.access_token ? session?.access_token : "";
    const query = {};
    const getReportList = appContainer.get<GetTechRecordSignListUseCase>(
      USECASES_TYPES._GetTechRecordSignListUseCase
    );
    const response = await getReportList.execute(query, token);
    if (response === undefined) {
      return;
    }
    setReports(response);
    setLoading(false);
  };

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggleClick = (tech_record_id: string) => {
    router.push("/tech-record-sign/" + tech_record_id);
  };

  useEffect(() => {
    getBusinessReportList();
  }, []);

  return (
    <div className="w-full md:w-11/12">
      <MainTitle text="Reporte de actas pendientes por firma" />
      <SectionSeparator className="mt-4" />

      <DataTable
        value={reports}
        pagination={10}
        filterable={true}
        loading={loading}
        emptyMessage="No hay actas pendientes por firma"
      >
        <Column field="id" header="Item N°" />
        <Column field="consultant_name" header="Consultor" />
        <Column
          field="appointment_date"
          header="Fecha de cita"
          type="daterange"
        />
        <Column
          field="tech_record_id"
          header="Acción"
          className="flex justify-center"
        >
          {(report: PendingTechRecordSign) => (
            <button
              onClick={() => toggleClick(report.tech_record_id)}
              className=" bg-principal-700 text-principal-150 px-8 py-2 rounded-lg text-center cursor-pointer"
            >
              Ver
            </button>
          )}
        </Column>
      </DataTable>
    </div>
  );
};
