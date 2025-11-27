"use client";

import Image from "next/image";
import { useState } from "react";

export const FileInput = () => {
  const [file, setFile] = useState<File | null>(null);
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
        return "/utopia/icons/pdf_icon.svg";
      case "doc":
      case "docx":
        return "/utopia/icons/word_icon.svg";
      case "xls":
      case "xlsx":
        return "/utopia/icons/excel_icon.svg";
      default:
        return "/utopia/icons/file_icon.png";
    }
  };

  return (
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
    >
      <input
        id="fileInput"
        type="file"
        accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf"
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
            src="/utopia/icons/upload.svg"
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
        ) : (
          "Haz clic o arrastra un archivo aquí"
        )}
      </p>
    </label>
  );
};
