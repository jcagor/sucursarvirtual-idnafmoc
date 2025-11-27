import React, { useState, useMemo } from "react";
import type { ReactElement, ReactNode } from "react";
import { CiFilter } from "react-icons/ci";

export interface ColumnProps<T> {
  field?: keyof T;
  header: string;
  children?: (row: T) => ReactNode;
  type?: "string" | "number" | "date" | "daterange";
  headerClassName?: string;
  className?: string;
}

export function Column<T>(_props: ColumnProps<T>) {
  return null;
}

interface ActiveFilter {
  field: string;
  value: any;
  type: "string" | "number" | "date" | "daterange";
}

interface DataTableProps<T> {
  value: T[];
  children: ReactElement<ColumnProps<T>> | ReactElement<ColumnProps<T>>[];
  pagination?: number;
  filterable?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;
  containerClassName?: string;
  tableClassName?: string;
  headerClassName?: string;
  borderAll?: boolean;
  borderNone?: boolean;
}

export function DataTable<T>({
  value,
  children,
  pagination,
  filterable = false,
  loading = false,
  loadingMessage = "Cargando...",
  emptyMessage = "No se encontraron datos",
  containerClassName = "",
  tableClassName = "",
  headerClassName = "",
  borderAll = false,
  borderNone = false,
}: DataTableProps<T>) {
  const columns = React.Children.toArray(children) as ReactElement<
    ColumnProps<T>
  >[];
  const [currentPage, setCurrentPage] = useState(1);

  // --- Filtros ---
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const [selectedField, setSelectedField] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [rangeValue, setRangeValue] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });

  const selectedCol = columns.find((c) => c.props.field === selectedField);

  const addFilter = () => {
    if (!selectedField) return;
    if (selectedCol?.props.type === "daterange") {
      if (!rangeValue.from || !rangeValue.to) return;
      setFilters((prev) => [
        ...prev,
        { field: selectedField, value: rangeValue, type: "daterange" },
      ]);
    } else {
      if (!inputValue.trim()) return;
      setFilters((prev) => [
        ...prev,
        {
          field: selectedField,
          value: inputValue,
          type: selectedCol?.props.type ?? "string",
        },
      ]);
    }
    setInputValue("");
    setRangeValue({ from: "", to: "" });
  };

  const removeFilter = (field: string) =>
    setFilters((prev) => prev.filter((f) => f.field !== field));

  const applyFilters = (rows: T[]) => {
    return filters.reduce((acc, f) => {
      return acc.filter((row) => {
        const val = row[f.field as keyof T];
        if (val == null) return false;

        switch (f.type) {
          case "number":
            return Number(val) === Number(f.value);
          case "date":
            return (
              new Date(val as any).toDateString() ===
              new Date(f.value).toDateString()
            );
          case "daterange":
            const date = new Date(val as any);
            const from = new Date(f.value.from);
            const to = new Date(f.value.to);
            return date >= from && date <= to;
          default:
            return String(val)
              .toLowerCase()
              .includes(String(f.value).toLowerCase());
        }
      });
    }, rows);
  };

  const clearFilters = () => setFilters([]);

  // --- Paginación ---
  const filteredRows = applyFilters(value);
  const pageSize = pagination ?? filteredRows.length;
  const totalPages = Math.ceil(filteredRows.length / pageSize);

  // Evita recalcular páginas en cada render
  const currentRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, currentPage, pageSize]);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="w-full">
      {/* LOADING */}
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center py-6">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-principal-180 transition-all duration-500" />
          <div className="text-principal-180 mt-2">{loadingMessage}</div>
        </div>
      ) : value.length === 0 ? (
        // mensaje de tabla vacía
        <div className="w-full py-3 flex flex-col items-center justify-center text-center text-principal-450 bg-principal-150 rounded-lg">
          <div className="text-lg font-bold">{emptyMessage}</div>
        </div>
      ) : (
        <>
          {/* FILTROS */}
          {filterable && (
            <>
              <p className="flex flex-row items-center gap-3 ">
                <CiFilter />
                <span className="font-bold">Filtros</span>
              </p>
              <div className="flex flex-col lg:flex-row justify-between gap-2 mb-3">
                <div className="flex flex-row items-center gap-2">
                  <select
                    className="border px-2 py-2 rounded outline-principal-180 border-principal-400 has-[option.placeholder:checked]:text-principal-460"
                    value={selectedField}
                    onChange={(e) => {
                      setInputValue("");
                      setRangeValue({ from: "", to: "" });
                      setSelectedField(e.target.value);
                    }}
                    title="Selecciona"
                  >
                    <option
                      value=""
                      className="text-principal-450 placeholder-principal-460 placeholder"
                      disabled
                    >
                      Selecciona
                    </option>
                    {columns
                      .filter((c) => c.props.field)
                      .map((col, i) => (
                        <option
                          key={i}
                          value={String(col.props.field)}
                          className="text-principal-450"
                        >
                          {col.props.header}
                        </option>
                      ))}
                  </select>

                  {selectedCol?.props.type === "daterange" ? (
                    <>
                      <input
                        type="date"
                        value={rangeValue.from}
                        onChange={(e) =>
                          setRangeValue((r) => ({ ...r, from: e.target.value }))
                        }
                        className="border px-2 py-2 rounded outline-principal-180 border-principal-400"
                      />
                      <input
                        type="date"
                        value={rangeValue.to}
                        onChange={(e) =>
                          setRangeValue((r) => ({ ...r, to: e.target.value }))
                        }
                        className="border px-2 py-2 rounded outline-principal-180 border-principal-400"
                      />
                    </>
                  ) : (
                    <input
                      type={
                        selectedCol?.props.type === "number"
                          ? "number"
                          : selectedCol?.props.type === "date"
                          ? "date"
                          : "text"
                      }
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="border px-2 py-2 rounded outline-principal-180 border-principal-400"
                      placeholder="Digita un valor"
                    />
                  )}
                </div>
                <div className="flex flex-row items-center justify-between w-full gap-2">
                  <button
                    onClick={addFilter}
                    className="bg-principal-180 text-principal-150 px-3 py-2 rounded"
                  >
                    Agregar
                  </button>

                  <button
                    onClick={clearFilters}
                    className="bg-principal-180 text-principal-150 px-3 py-2 rounded"
                  >
                    Limpiar filtros
                  </button>
                </div>
              </div>

              {/* Mostrar filtros activos */}
              <div className="flex flex-row items-center gap-2 mb-3">
                {filters.map((f) => (
                  <span
                    key={f.field}
                    className="bg-principal-180/10 text-sm px-2 py-1 flex items-center gap-1 rounded-md"
                  >
                    {
                      columns.find((c) => c.props.field === f.field)?.props
                        .header
                    }
                    {": "}
                    {f.type === "daterange"
                      ? `${f.value.from} → ${f.value.to}`
                      : f.value}
                    <button
                      onClick={() => removeFilter(f.field)}
                      className="text-red-500 ml-1"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </>
          )}

          {currentRows.length === 0 ? (
            // mensaje de tabla vacía
            <div className="w-full py-3 flex flex-col items-center justify-center text-center text-principal-450 bg-principal-150 rounded-lg">
              <div className="text-lg font-bold">{emptyMessage}</div>
            </div>
          ) : (
            <div
              className={`relative w-full overflow-x-auto overflow-y-hidden max-w-full bg-principal-150 rounded-lg px-8 py-2 ${containerClassName}`}
            >
              <table
                className={`w-full table-auto border-collapse border-principal-600 ${tableClassName}`}
              >
                <thead className={headerClassName}>
                  <tr>
                    {columns.map((col, i) => (
                      <th
                        key={i}
                        className={`px-4 py-2 whitespace-nowrap text-ellipsis overflow-hidden ${
                          borderAll
                            ? "border border-principal-600"
                            : borderNone
                            ? ""
                            : "border-b border-principal-600"
                        } ${col.props.headerClassName}`}
                      >
                        {col.props.header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, ri) => (
                    <tr key={ri} className="hover:bg-gray-50 text-gray-700">
                      {columns.map((col, ci) => (
                        <td
                          key={ci}
                          className={`px-4 py-2 text-principal-450 whitespace-nowrap text-ellipsis overflow-hidden ${
                            borderAll
                              ? "border border-principal-600"
                              : borderNone
                              ? ""
                              : "border-b border-principal-600"
                          } ${col.props.className}`}
                        >
                          {col.props.children
                            ? col.props.children(row)
                            : col.props.field
                            ? String(row[col.props.field])
                            : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {pagination && totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    &lt;
                  </button>
                  <span className="text-sm">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
