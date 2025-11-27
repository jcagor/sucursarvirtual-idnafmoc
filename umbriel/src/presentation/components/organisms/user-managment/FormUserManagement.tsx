'use client';

import { UserForm } from "../../molecules/UserForm";
import { FileUploader } from "../../molecules/FileUploader";
import { SecondaryText, SectionSeparator } from "../../atoms/common";
import { MainTitle } from "@comfanditd/chronux-ui";
import { useUserManagement } from "@/presentation/hooks/useUserManagement";
import { LoadingAnimation } from "@/presentation/components/molecules/loading";

export const FormUserManagement = () => {
  const {
    hasFileUploaded,
    validationErrors,
    isLoading,
    progress,
    handleFileUpload,
    handleSubmit,
    generateTemplate
  } = useUserManagement();

  return (
    <div className="space-y-6 pr-8">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white w-full h-full max-w-lg mx-auto">
            <div className="flex flex-col items-center">
              <LoadingAnimation />
              {progress && (
                <div className="w-full mt-6 text-center">
                  <p className="text-gray-700 text-lg mb-3">
                    Procesando filas {progress.processedRows} de {progress.totalRows}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-principal-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-principal-500 font-semibold text-lg mt-3">
                    {progress.percentage}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <MainTitle text="Registro de Usuario" />
      <SectionSeparator />
      
      <div className="space-y-2">
        <SecondaryText text={"Carga de multiples usuarios"} />
        <button
          onClick={generateTemplate}
          className="text-principal-500 hover:text-principal-600 text-sm underline"
        >
          Descargar modelo de Excel
        </button>
      </div>
      <FileUploader
        title="Subir Documento"
        description="Sube un documento con los datos de los usuarios"
        acceptedFileTypes=".xlsx,.xls,.csv"
        maxFileSize={5 * 1024 * 1024}
        onFileUpload={handleFileUpload}
        buttonLabels={{
          cancel: "Cancelar",
          confirm: "Confirmar"
        }}
        modalConfig={{
          title: "Confirmar subida",
          description: "¿Estás seguro de que deseas subir este archivo?",
          showModal: true
        }}
      />
      {validationErrors.length > 0 && (
        <div className="mt-4 p-4 bg-red-50 rounded-md">
          <h3 className="text-red-700 font-semibold mb-2">
            Se encontraron {validationErrors.length} filas con errores
          </h3>
          <p className="text-red-600 mb-2">
            Por favor, corrige los siguientes problemas en tu archivo:
          </p>
          <ul className="list-disc list-inside text-red-500">
            {Array.from(new Set(validationErrors.flatMap(error => error.errors))).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <p className="text-red-600 mt-2">
            Revisa las filas {validationErrors.map(e => e.row).join(', ')} para corregir estos errores.
          </p>
        </div>
      )}
      <SectionSeparator />
      <UserForm onSubmit={handleSubmit} disabled={hasFileUploaded} />
    </div>
  );
}; 