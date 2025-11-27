"use client";
import { useState, useEffect } from "react";

// Definir el tipo para la respuesta del fetcher, utilizando un tipo genérico T
interface FetchDataResult<T> {
  //   items: T[];
  totalRecords: number;
}

// Definir el tipo para la función fetcher, también con un tipo genérico T
export type DataFetcher<T, F = Record<string, any>> = (
  pageIndex: number,
  pageSize: number,
  filters?: F
) => Promise<FetchDataResult<T>>;

export function usePagination<T, F = Record<string, any>>(
  dataFetcher: DataFetcher<T, F>,
  pageSize: number = 5
) {
  //   const [data, setData] = useState<T[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<F | undefined>(undefined);

  const fetchData = async (
    pageIndex: number,
    pageSize: number,
    currentFilters?: F
  ): Promise<void> => {
    setIsLoading(true);
    const result = await dataFetcher(pageIndex, pageSize, currentFilters);
    setIsLoading(false);
    setTotalRecords(result.totalRecords);
  };

  useEffect(() => {
    fetchData(pageIndex, pageSize, filters);
  }, [pageIndex, pageSize]);

  const pageCount = Math.ceil(totalRecords / pageSize);

  return {
    // data,
    pageIndex,
    setPageIndex,
    filters,
    setFilters,
    totalRecords,
    setTotalRecords,
    pageCount,
    isLoading,
  };
}
