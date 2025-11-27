"use client";

import { MainTitle } from "@comfanditd/chronux-ui";
import { FormCustomFileEntity } from "domain/models/tech-assistance-cert/techAssistanceForm";
import Image from "next/image";
import {
  Button,
  SecondaryText,
  SectionSeparator,
} from "presentation/components/atoms";
import { ModalTitle } from "presentation/components/atoms/common/modals/text/ModalTitle";
import { useEffect, useState } from "react";

interface DigitalSignatureCustomProps {
  onChange: Function;
}

export const DigitalSignatureCustom = (props: DigitalSignatureCustomProps) => {
  const { onChange = (files: T) => {} } = props;

  interface T extends globalThis.File {}
  const [files, setFiles] = useState<FormCustomFileEntity[]>();

  const [openModal, setOpenModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImage = async (file: File) => {
    if (file && file.type.startsWith("image/")) {
      let fileToStore = await createFileObject(file);
      setFiles([fileToStore]);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function arrayBufferToBase64(buffer: Uint8Array) {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const createFileObject = async (file: T) => {
    const bytes = await file.arrayBuffer().then((buffer) => {
      const bytes_tmp = new Uint8Array(buffer);
      return bytes_tmp;
    });
    //const binary = String.fromCharCode.apply(null, bytes);
    let base64String = arrayBufferToBase64(bytes);

    return {
      data: base64String,
      name: file.name,
      size: file.size,
      type: file.type,
    } as FormCustomFileEntity;
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

  const confirmModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    console.log("file updated", files);
    onChange(files);
  }, [files]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-4 p-4 bg-principal-150 rounded-md border-2 border-principal-400">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Previsualización"
            className="max-w-xs max-h-64 rounded-lg shadow"
          />
        ) : (
          <label
            htmlFor="imageInput"
            className={`cursor-pointer flex flex-col items-center w-full py-5 border-2 border-dashed rounded-md transition ${
              dragActive
                ? "border-principal-500 bg-principal-100"
                : "border-principal-180"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex justify-center">
              <Image
                src="/lalande/icons/upload.svg"
                alt="Upload"
                width={38}
                height={38}
                draggable={false}
              />
            </div>
            <p className="text-principal-180">
              Haz clic o arrastra una imagen aquí (JPEG, JPG, PNG)
            </p>
          </label>
        )}
      </div>

      {openModal && (
        <Modal
          onClose={() => setOpenModal(false)}
          className={`md:w-[463px] rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 subpixel-antialiased`}
        >
          <Image
            src="/lalande/icons/campaign-alert.png"
            alt="Close icon"
            width={80}
            height={80}
            className={`cursor-pointer`}
            priority
          />
          <ModalTitle text="¡Firma registrada con éxito!" className="mt-2" />
          <div className="text-principal-450 text-center">
            Tu firma ha sido registrada correctamente.
          </div>
          <div className="flex flex-col w-[70%] space-y-3 py-2">
            <Button
              label="Continuar"
              onClick={confirmModal}
              className="w-full"
              primary
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

const Modal: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onClose, children, className }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-principal-50 bg-opacity-30 `}
      onClick={onClose}
      onKeyDown={(e) => {}}
    >
      <div
        className={`bg-principal-150 p-6 rounded-lg shadow-lg w-96 ${
          className || ""
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {}}
      >
        {children}
      </div>
    </div>
  );
};
