"use client";
import { useState, useEffect, type FC, Fragment } from "react";
import { flexRender } from "@tanstack/react-table";
import { TableDataParams } from "lib/types/table";
import {
  LoadingAnimation,
  NeutralBlackText,
  SectionSeparator,
} from "presentation/components/atoms";

export const FiledTableBody: FC<TableDataParams> = ({
  table,
  isLoading,
  className,
}) => {
  let content;

  if (isLoading) {
    content = (
      <div className="flex flex-col items-center justify-center w-full h-[300px] p-6 relative">
        <LoadingAnimation
          containerClassName="w-32 h-32 flex items-center justify-center"
          className="w-full h-full text-blue-600 animate-spin"
        />
      </div>
    );
  } else if (table?.getRowModel().rows.length === 0) {
    content = (
      <div className="flex items-center justify-center w-full h-[300px] p-6">
        <NeutralBlackText
          className="text-lg font-medium text-gray-500"
          text="No hay datos disponibles"
        />
      </div>
    );
  } else {
    content = (
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[800px] lg:min-w-full table-auto border-collapse">
          <thead className="bg-principal-50">
            {table?.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-3 sm:py-4 px-3 sm:px-4 text-left font-semibold text-gray-800 border-b border-gray-200"
                  >
                    <NeutralBlackText
                      className="text-sm sm:text-base"
                      text={header.column.columnDef.header?.toString() ?? ""}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table?.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <tr className="hover:bg-gray-100 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-200 text-sm sm:text-base text-gray-700"
                    >
                      <div className="min-w-0 break-words">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      className={`w-full bg-white rounded-xl shadow-sm p-4 sm:p-5 md:p-6 ${className}`}
    >
      {content}
    </div>
  );
};
