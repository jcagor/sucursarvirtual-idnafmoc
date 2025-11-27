"use client";
import { useState, useEffect, type FC } from "react";
import React from "react";
import { TableParams } from "lib/types/table";
import {
  NeutralBlackText,
  SectionSeparator,
} from "presentation/components/atoms";

export const TableTable: FC<TableParams> = ({ columns, rows, className }) => {
  const [numColumns, setNumColumns] = useState<string>("");

  useEffect(() => {
    const array = new Array<string>(9);
    array.fill("116px");
    setNumColumns(`grid gap-[0rem] grid-cols-[${array}]`);
  }, [columns]);
  return (
    <div
      className={`grid overflow-x-auto w-10/12 pl-2 mb-5 bg-principal-250 rounded-xl ${className}`}
    >
      {numColumns.length > 0 ? (
        <table className={`grid w-[64.688rem]`}>
          <thead className={``}>
            {/* Pendiente revisar y optimizar para ser modular la cantidad de columnas */}
            <tr
              className={`grid ml-4 gap-[0rem] grid-cols-[9rem,9rem,9rem,9rem,9rem,9rem,9rem,9rem]`}
            >
              {columns.map((column, key) => (
                <>
                  <th key={key} className={"grid col-span-1 h-[4rem]"}>
                    <div
                      className={"flex flex-wrap items-center h-full w-full"}
                    >
                      <NeutralBlackText
                        className={
                          "w-full justify-self-center line-clamp-2 align-middle text-center self-center"
                        }
                        text={column}
                      />
                    </div>
                  </th>
                </>
              ))}
            </tr>
            <SectionSeparator className=" my-2 ml-6" />
          </thead>
          <tbody className={``}>
            {rows?.map((row, keyX) => (
              <>
                <tr
                  key={keyX}
                  className={`grid gap-[0rem] ml-4 grid-cols-[9rem,9rem,9rem,9rem,9rem,9rem,9rem,9rem]`}
                >
                  {row.map((rowData, keyY) => {
                    if (!rowData) {
                      return <p key={keyY}>-</p>;
                    }
                    const ElementToRender = React.memo(() => rowData);
                    ElementToRender.displayName = "ElementToRender"; // Add this line

                    return (
                      <td key={keyY} className="grid col-span-1 ">
                        <div
                          className={
                            "flex flex-wrap items-center h-full w-full"
                          }
                        >
                          <div
                            className={
                              "flex w-full justify-self-center justify-center line-clamp-2 align-middle text-center items-center self-center"
                            }
                          >
                            <ElementToRender key={keyY} />
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <SectionSeparator className=" my-2 ml-6" />
              </>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
};
