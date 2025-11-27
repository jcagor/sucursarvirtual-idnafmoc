"use client";

import { FormCustomFileEntity, S3FileId } from "domain/models/tech-assistance-cert/techAssistanceForm";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";

interface DigitalSignaturePreviewProps {
  imageDataString: S3FileId;
  readOnly?: boolean;
  handleEdit?: Function;
}

export const DigitalSignaturePreview = (
  props: DigitalSignaturePreviewProps
) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImage = async (file: FormCustomFileEntity) => {
    if (file) {
      const base64 = `data:${file.type};base64,` + file.data;
      setImagePreview(base64);
    }
  };

  useEffect(() => {
    //handleImage(props.imageDataString);
    setImagePreview(`/lalande/api/img?url=${encodeURIComponent(props.imageDataString.toString())}`)
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-4 p-4 bg-principal-150 rounded-md border-2 border-principal-400">
        {imagePreview ? (
          <div>
            <img
              src={imagePreview}
              alt="Previsualización"
              className="max-w-xs max-h-64 rounded-lg shadow"
            />
            {!props.readOnly && (
              <div className="flex items-center justify-center">
                <button
                  onClick={(e) => {if(props.handleEdit){props.handleEdit()}}}
                  onKeyUp={() => {}}
                  className="my-3 rounded-lg bg-principal-180 text-principal-150 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 shadow"
                >
                  <span className="flex">
                    Cambiar <CiEdit className="mx-2 h-5" />
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>No se encuentra información!</p>
        )}
      </div>
    </div>
  );
};
