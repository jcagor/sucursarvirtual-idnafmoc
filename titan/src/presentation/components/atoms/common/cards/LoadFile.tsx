import Image from "next/image";
import React, { FC } from "react";

interface LoadFileProps {
  title: string;
  file: File | null;
  setFile: (file: File | null, name: string) => void;
  name: string;
  errors: React.ReactNode;
  maxSizeMB: number;
  allowedFileTypes: string[];
}

const LoadFile: FC<LoadFileProps> = ({
  title,
  file,
  setFile,
  name,
  errors,
  maxSizeMB,
  allowedFileTypes,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = React.useState(false);

  const formatFileSize = (bytes: number): string => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
  };

  const validateFile = (file: File): boolean => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const fileExtension = file.name.split(".").pop()?.toLowerCase() ?? "";

    if (file.size > maxSizeBytes) {
      alert(
        `El archivo excede el tamaño máximo permitido de ${formatFileSize(
          maxSizeBytes
        )}`
      );
      return false;
    }

    if (!allowedFileTypes.includes(fileExtension.toLowerCase())) {
      alert(
        `Solo se permiten archivos de tipo: ${allowedFileTypes
          .map((type) => type.toUpperCase())
          .join(", ")}`
      );
      return false;
    }

    return true;
  };

  const hasFileContent = (file: File | null): boolean => {
    return file !== null && file.size > 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile, name);
      }
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile, name);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleRemove = () => {
    setFile(new File([], "empty.PDF", { type: ".PDF" }), name);
    if (!hasFileContent(file) && fileInputRef.current)
      fileInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <p className="text-principal-450 font-normal mb-4">{title}</p>
      <div
        className={`
          bg-blue-50 border-2 rounded-xl min-h-[180px] flex flex-col items-center justify-center relative transition-colors
          ${
            isDragActive
              ? "border-principal-460 bg-principal-120 border-dashed"
              : "bg-principal-110 border-principal-460 border-dashed"
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragLeave}
        onClick={() => {
          if (fileInputRef.current) fileInputRef.current.click();
        }}
      >
        {!hasFileContent(file) ? (
          <label
            className="flex flex-col items-center cursor-pointer w-full h-full py-8"
            htmlFor="file-upload"
          >
            <div className="bg-principal-180 rounded-full w-14 h-14 flex items-center justify-center mb-3">
              <Image
                src="/icons/upload_file.svg"
                alt="upload-file"
                width={24}
                height={24}
              />
            </div>
            <span className="text-principal-180 font-medium text-lg">
              Subir archivo aquí
            </span>
            <input
              id={name}
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="text-xs text-principal-180 mt-2">
              O arrastra y suelta el archivo aquí
            </span>
          </label>
        ) : (
          <div className="flex flex-col items-center w-full">
            <span className="text-principal-180 font-medium text-base mb-2 break-all">
              {file!.name}
            </span>
            <button
              type="button"
              onClick={handleRemove}
              className="bg-principal-500 text-principal-150 rounded px-4 py-1 cursor-pointer font-medium text-sm hover:bg-blue-50 transition"
            >
              Borrar archivo
            </button>
          </div>
        )}
      </div>
      <div className="w-full max-h-10 overflow-y-scroll no-scrollbar">
        {errors}
      </div>
    </div>
  );
};

export default LoadFile;
