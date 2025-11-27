"use client";

import Image from "next/image";
import { Button } from "../atoms/common";
import { ModalTitle } from "../atoms/common/modals/text/ModalTitle";
import { FileUploaderBaseProps } from "@/types/fileUploader";
import { useFileUploader } from "@/presentation/hooks/useFileUploader";
import { FileUploaderModal } from "../atoms/common/modals/FileUploaderModal";

export const FileUploader: React.FC<Omit<FileUploaderBaseProps, 'onFileUpload'> & { onFileUpload: (file: File) => Promise<void> }> = ({
  title,
  description,
  acceptedFileTypes = "image/*",
  maxFileSize,
  onFileUpload,
  onCancel,
  onConfirm,
  previewComponent,
  buttonLabels = {
    cancel: "Borrar",
    upload: "Subir archivo",
    confirm: "Confirmar",
  },
  modalConfig,
}) => {
  const {
    filePreview,
    dragActive,
    openModal,
    setOpenModal,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    resetFilePreview,
  } = useFileUploader({ maxFileSize, onFileUpload });

  const handleCancel = () => {
    resetFilePreview();
    onCancel?.();
  };

  const handleConfirm = async () => {
    if (filePreview) {
      try {
        await onFileUpload(filePreview);
        setOpenModal(false);
        resetFilePreview();
        onConfirm?.();
      } catch (error) {
        console.error('Error al subir el archivo:', error);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-4 p-4 bg-principal-150">
        {filePreview ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-principal-450">
              Archivo seleccionado: {filePreview.name}
            </div>
            <div className="flex gap-2">
              <Button
                label={buttonLabels.cancel}
                onClick={handleCancel}
                className="w-[180px]"
              />
              <Button
                label={buttonLabels.confirm}
                onClick={() => setOpenModal(true)}
                primary
                className="w-[180px]"
              />
            </div>
          </div>
        ) : (
          <label
            htmlFor="fileInput"
            className={`cursor-pointer flex flex-col items-center gap-2 w-full py-8 border-2 border-dashed rounded-md transition ${
              dragActive
                ? "border-principal-500 bg-principal-100"
                : "border-principal-180"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            role="button"
            tabIndex={0}
            aria-label="Área para subir archivos"
          >
            <input
              id="fileInput"
              type="file"
              accept={acceptedFileTypes}
              onChange={handleFileChange}
              className="hidden"
              aria-label="Seleccionar archivo"
            />
            <div className="flex justify-center">
              <Image
                src="/icons/upload.svg"
                alt="Upload"
                width={38}
                height={38}
                draggable={false}
              />
            </div>
            <p className="text-principal-180">
              Haz clic o arrastra un archivo aquí
            </p>
          </label>
        )}
      </div>

      {openModal && modalConfig && (
        <FileUploaderModal
          onClose={() => setOpenModal(false)}
          className="md:w-[463px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased"
        >
          <Image
            src="/icons/campaign-alert.png"
            alt="Alerta"
            width={80}
            height={80}
            className="cursor-pointer"
            priority
          />
          <ModalTitle text={modalConfig.title} className="mt-2" />
          <div className="text-principal-450 text-center">
            {modalConfig.description}
          </div>
          <div className="flex flex-col w-[70%] space-y-3 py-2">
            <Button
              label={buttonLabels.confirm}
              onClick={handleConfirm}
              className="w-full"
              primary
              aria-label={buttonLabels.confirm}
            />
          </div>
        </FileUploaderModal>
      )}
    </div>
  );
}; 