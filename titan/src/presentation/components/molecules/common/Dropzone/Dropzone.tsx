"use client";
import { useCallback, type FC, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  AlertIcon,
  Button,
  Description,
  ExcelIcon,
  ModalSecondTemplate,
  TrashIcon,
  UploadIcon,
} from "presentation/components";

export interface DropzoneProps {
  className: string;
  onChange: (selection: File[]) => void;
  onDelete: (selection: File[]) => void;
  title: string;
}

export const Dropzone: FC<DropzoneProps> = ({
  className,
  onChange,
  onDelete,
  title,
}) => {
  const [acceptedFiles, setAcceptedFiles] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((selectedFiles: File[]) => {
    if (selectedFiles.length > 1) {
      setModalOpen(true);
      setModalMessage("Solo se puede subir un archivo");
    }
    let approveFiles: File[] = [];
    selectedFiles.forEach((file) => {
      if (
        file.type.includes("application/pdf") ||
        file.type.includes("image/jpeg")
      ) {
        if (file.size > 5000000 || file.size == 0) {
          setModalOpen(true);
          setModalMessage(
            "Los soportes deben estar en formato PDF, JPG o JPEG, su peso maximo es 5MB y no puede estar vacio"
          );
          return;
        } else {
          approveFiles.push(file);
        }
      } else {
        setModalOpen(true);
        setModalMessage(
          "Los soportes deben estar en formato PDF, JPG o JPEG y su peso maximo es 5MB"
        );
        return;
      }
    });
    if (approveFiles.length > 0) {
      setAcceptedFiles(true);
      setFiles(approveFiles);
      onChange(approveFiles);
    }
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { getRootProps, getInputProps } = useDropzone({ onDrop }); // TODO: implementar acceptedFiles

  return (
    <section className={className}>
      <Description
        text={title}
        className="text-sm font-normal text-principal-320 mb-1"
      />
      <div
        {...getRootProps({
          className:
            "flex flex-col items-center h-28 border-principal-900 rounded border border-dashed bg-principal-950",
        })}
      >
        <input {...getInputProps()} className="h-28" disabled={acceptedFiles} />
        <div className="flex flex-row items-center mt-6">
          {acceptedFiles ? (
            <div className="flex flex-row items-center mt-3">
              <ExcelIcon />
              {files.map((file, index) => {
                return (
                  <p
                    key={index}
                    className="font-outfit text-principal-100 mx-2"
                  >
                    {file.name}
                  </p>
                );
              })}
              <button
                onClick={() => {
                  setAcceptedFiles(false);
                  setFiles([]);
                  onDelete(files);
                }}
              >
                <TrashIcon />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <UploadIcon />
              <p className="font-outfit text-principal-100">
                Subir archivo aquí
              </p>
            </div>
          )}
        </div>
      </div>
      <ModalSecondTemplate
        isOpen={modalOpen}
        className="w-[calc(524px)]"
        onButtonClick={() => setModalOpen(false)}
      >
        <div className="flex flex-row justify-center">
          <AlertIcon className="top-4" />
          <p className="pt-16 text-lg font-poppins text-center text-principal-180">
            {modalMessage}
          </p>
        </div>
      </ModalSecondTemplate>
    </section>
  );
};
