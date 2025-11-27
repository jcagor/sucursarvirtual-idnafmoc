import { NeutralButton, SimpleInput } from "presentation/components/atoms";

interface PaginatorProps {
  pageIndex: number;
  pageSize: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  pageIndex,
  pageSize,
  canPreviousPage,
  canNextPage,
  pageCount,
  setPageIndex,
  setPageSize,
}) => {
  return (
    <div className="flex items-center space-x-2 my-4 justify-center flex-wrap">
      {/* Botones de paginación */}
      <NeutralButton
        onClick={() => setPageIndex(0)}
        disabled={!canPreviousPage}
        className="bg-principal-100 text-principal-150"
      >
        {"<<"}
      </NeutralButton>
      <NeutralButton
        onClick={() => setPageIndex(pageIndex - 1)}
        disabled={!canPreviousPage}
        className="bg-principal-100 text-principal-150"
      >
        Anterior
      </NeutralButton>
      <span className="text-principal-320 text-xs">
        Pagina{" "}
        <SimpleInput
          type="number"
          defaultValue={pageIndex + 1}
          className="  w-16 text-center p-1 text-principal-320 bg-principal-50 rounded-xl"
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            if (page <= pageCount) {
              setPageIndex(page);
            }
          }}
        />{" "}
        de {pageCount}
      </span>
      <NeutralButton
        onClick={() => setPageIndex(pageIndex + 1)}
        disabled={!canNextPage}
        className="bg-principal-100 text-principal-150"
      >
        Siguiente
      </NeutralButton>
      <NeutralButton
        onClick={() => setPageIndex(pageCount - 1)}
        disabled={!canNextPage}
        className="bg-principal-100 text-principal-150"
      >
        {">>"}
      </NeutralButton>
      {/* Selector de página y tamaño de página */}

      <div>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
          className="select select-bordered rounded-xl px-3 bg-principal-100 text-principal-300"
        >
          {[5, 10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Visualizando {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Paginator;
