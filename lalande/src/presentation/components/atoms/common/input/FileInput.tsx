"use client";

import Image from "next/image";
import { useState } from "react";

type FileInputProps = {
  file: File | null;
  setFile: (file: File | null) => void;
  inputId?: string;
  acceptedFileTypes?: string;
  description?: string;
};

export const FileInput: React.FC<FileInputProps> = ({
  file,
  setFile,
  inputId,
  acceptedFileTypes = ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf",
  description,
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const getFileIcon = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "pdf":
        return "/lalande/icons/pdf_icon.svg";
      case "doc":
      case "docx":
        return "/lalande/icons/word_icon.svg";
      case "xls":
      case "xlsx":
        return "/lalande/icons/excel_icon.svg";
      default:
        return "/lalande/icons/file_icon.png";
    }
  };

  return (
    <label
      htmlFor={inputId}
      className={`cursor-pointer flex flex-col items-center gap-2 w-full py-8 border-2 border-dashed rounded-md transition ${
        dragActive
          ? "border-principal-500 bg-principal-100"
          : "border-principal-180"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        id={inputId}
        type="file"
        accept={acceptedFileTypes}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex justify-center">
        {file ? (
          <Image
            src={getFileIcon(file)}
            alt="File icon"
            width={38}
            height={38}
            draggable={false}
          />
        ) : (
          <Image
            src="/lalande/icons/upload.svg"
            alt="Upload"
            width={38}
            height={38}
            draggable={false}
          />
        )}
      </div>

      <p className="text-principal-180">
        {file ? (
          <span className="text-principal-500 font-medium">{file.name}</span>
        ) : description ? (
          description
        ) : (
          "Haz clic o arrastra un archivo aquí pdf, word, excel"
        )}
      </p>
    </label>
  );
};
