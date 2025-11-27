import React from "react";
import Image from "next/image";

interface ImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (file: File) => void;
  isDisabled?: boolean;
  className?: string;
  disabledMessage?: string;
  enabledMessage?: string;
  accept?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  imagePreview,
  onImageChange,
  isDisabled = false,
  className = "",
  disabledMessage = "Debes aceptar los términos y condiciones para cargar una imagen",
  enabledMessage = "Haz clic o arrastra una imagen aquí",
  accept = "image/*",
  maxWidth = "max-w-xs",
  maxHeight = "max-h-64",
}) => {
  const [dragActive, setDragActive] = React.useState(false);

  const handleImage = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      onImageChange(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImage(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImage(file);
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

  return (
    <div
      className={`flex flex-col items-center gap-4 p-4 bg-principal-150 ${className}`}
    >
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Previsualización"
          className={`${maxWidth} ${maxHeight} rounded-lg shadow`}
        />
      ) : (
        <label
          htmlFor="imageInput"
          className={`flex flex-col items-center gap-2 w-full py-8 border-2 border-dashed rounded-md transition ${
            isDisabled
              ? "opacity-50 cursor-not-allowed bg-principal-100"
              : dragActive
              ? "border-principal-500 bg-principal-100 cursor-pointer"
              : "border-principal-180 cursor-pointer"
          }`}
          onDrop={isDisabled ? undefined : handleDrop}
          onDragOver={isDisabled ? undefined : handleDragOver}
          onDragLeave={isDisabled ? undefined : handleDragLeave}
        >
          <input
            id="imageInput"
            type="file"
            accept={accept}
            onChange={handleImageChange}
            className="hidden"
            disabled={isDisabled}
          />
          <div className="flex justify-center">
            <Image
              src="/utopia/icons/upload.svg"
              alt="Upload"
              width={38}
              height={38}
              draggable={false}
            />
          </div>
          <p
            className={`text-principal-180 ${
              isDisabled ? "text-principal-300" : ""
            }`}
          >
            {isDisabled ? disabledMessage : enabledMessage}
          </p>
        </label>
      )}
    </div>
  );
};
