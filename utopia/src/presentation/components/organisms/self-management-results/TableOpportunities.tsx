"use client";
import { MainTitle } from "@comfanditd/chronux-ui";
import Image from "next/image";
import { dataTableOpportunities } from "lib";
import { useState } from "react";

interface CurrentFormProps {
  setCurrentForm: React.Dispatch<React.SetStateAction<number>>;
}

export const TableOpportunities: React.FC<CurrentFormProps> = ({
  setCurrentForm,
}) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof (typeof dataTableOpportunities)[0]) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const sortedData = [...dataTableOpportunities].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (
      typeof aValue === "object" &&
      typeof bValue === "object" &&
      "index" in aValue &&
      "index" in bValue
    ) {
      return sortOrder === "asc"
        ? (aValue as { index: number }).index -
            (bValue as { index: number }).index
        : (bValue as { index: number }).index -
            (aValue as { index: number }).index;
    }

    return 0;
  });

  const previousForm = () => {
    setCurrentForm(1);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full pr-6">
      <MainTitle className="mb-6" text="Oportunidades" />
      <div className="w-full px-8 py-4 rounded-xl shadow-md bg-principal-150 text-xs xl:text-xs 2xl:text-base">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-7 2xl:grid-cols-8 gap-1 px-1 xl:px-3 xl:gap-4 items-center text-center p-3 min-w-[800px]">
            {[
              { label: "Oportunidades identificadas", field: "Opportunity" },
              { label: "Línea de intervención", field: "LineIntervention" },
              { label: "Importancia para la empresa", field: "Importance" },
              { label: "Urgencia de realización", field: "Urgency" },
              { label: "Facilidad de implementación", field: "Ease" },
              { label: "Resultado priorización", field: "Result" },
            ].map(({ label, field }) => (
              <button
                key={field}
                onClick={() =>
                  handleSort(field as keyof (typeof dataTableOpportunities)[0])
                }
                className={`flex items-center justify-center gap-1 ${
                  field === "Opportunity" ? "col-span-2 2xl:col-span-3" : ""
                }`}
              >
                {label}
                {sortField === field &&
                  (sortOrder === "asc" ? (
                    <Image
                      src="/utopia/icons/Sort-Up-Icon.svg"
                      alt="asc"
                      width={10}
                      height={10}
                    />
                  ) : (
                    <Image
                      src="/utopia/icons/Sort-Down-Icon.svg"
                      alt="desc"
                      width={10}
                      height={10}
                    />
                  ))}
              </button>
            ))}
          </div>
          <div className="flex flex-col min-w-[800px]">
            {sortedData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-7 2xl:grid-cols-8  items-center py-4 gap-1 px-1 xl:px-3 xl:gap-4 text-center even:bg-principal-150 odd:bg-principal-680"
              >
                <div className="col-span-2 2xl:col-span-3 px-3 text-principal-450 text-left">
                  {item.Opportunity}
                </div>
                <div className="text-principal-450">
                  {item.LineIntervention}
                </div>
                <div className={`px-3 py-1`}>
                  <div
                    className={`p-2 rounded-lg text-principal-350 bg-opacity-75 bg-[${item.Importance.color}]`}
                  >
                    {item.Importance.name}
                  </div>
                </div>
                <div className={`px-3 py-1`}>
                  <div
                    className={`p-2 rounded-lg text-principal-350 bg-opacity-75 bg-[${item.Urgency.color}]`}
                  >
                    {item.Urgency.name}
                  </div>
                </div>
                <div className={`px-3 py-1`}>
                  <div
                    className={`p-2 rounded-lg text-principal-350 bg-opacity-75 bg-[${item.Ease.color}]`}
                  >
                    {item.Ease.name}
                  </div>
                </div>
                <div className={`flex justify-center px-3 py-1`}>
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-principal-350 bg-opacity-75 bg-[${item.Result.color}]`}
                  >
                    {item.Result.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center h-16 min-h-16 mb-10">
        <a
          className="cursor-pointer"
          onClick={previousForm}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              previousForm();
            }
          }}
        >
          Atrás
        </a>
      </div>
    </div>
  );
};
