"use client";

import { File } from "buffer";
import Image from "next/image";
import { CardManageSection } from "presentation/components/molecules";
import { useCallback, useEffect, useState } from "react";
import {
  DropEvent,
  DropzoneOptions,
  FileRejection,
  useDropzone,
} from "react-dropzone";
import { FcImageFile } from "react-icons/fc";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { AiFillFileAdd } from "react-icons/ai";
import { FormCustomFileEntity } from "domain/models/tech-assistance-cert/techAssistanceForm";

type DropZoneCustomProps = {
  name: string;
  acceptedFileTypes?: Array<string>;
  addItemList?: boolean;
  simpleDesign?: boolean;
  placeholder?: string;
  onChange?: Function;
};

export const FileDropZoneInput = (
  props: DropzoneOptions & DropZoneCustomProps
) => {
  const {
    name,
    maxFiles = 10,
    multiple = true,
    noClick = false,
    maxSize = 5000000, // 5Mb = 5000000
    acceptedFileTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      //"application/pdf",
    ],
    placeholder = "Subir archivo o tomar fotografía",
    addItemList = true,
    simpleDesign = false,
    onChange = (files: T[]) => {},
  } = props;
  interface T extends globalThis.File {}
  const [files, setFiles] = useState<FormCustomFileEntity[]>();

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

  /**
   * Function called when a new file is drag and dropped in the share area.
   */
  const onDrop = useCallback(
    (dropFiles: T[], fileRejected: FileRejection[], event: DropEvent) => {
      console.log("Files:", dropFiles, typeof dropFiles);
      /* Validate type of file. Only .pdf, .txt & .jpg */
      dropFiles.forEach(async (file) => {
        if (acceptedFileTypes.includes(file.type)) {
          // && (files && files?.length < maxFiles)
          console.log(`DropZone'${file.name}' loaded`);
          let fileToStore = await createFileObject(file);
          setFiles((prevState) => {
            if (prevState) {
              return [...prevState, fileToStore];
            } else {
              return [fileToStore];
            }
          });
        } else {
          console.error("Type of file not supported");
        }
      });

      fileRejected.forEach((file) => {
        console.error(
          "File Rejected: ",
          file.file,
          file.errors.map((error) => {
            return `Error: ${error.code} - ${error.message}`;
          })
        );
      });
    },
    []
  );

  /**
   * react dropzone connection to handle new files.
   */
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    ...props,
  });

  useEffect(() => {
    onChange(files);
  }, [files]);

  return (
    <div
      {...getRootProps({
        className: "w-full py-1 text-center mb-5",
      })}
    >
      <div className="block py-2 rounded-md border-2 border-principal-400 bg-[#FFF]">
        <input name="" {...getInputProps()} />
        <div className="flex justify-center focus:cursor-pointer">
          <Image
            src={"/lalande/icons/upload.svg"}
            alt="Upload"
            width={38}
            height={38}
            draggable={false}
            className="flex"
          />
        </div>
        <p className="text-principal-180">{placeholder}</p>
      </div>
      <CardManageSection>
        {addItemList && !simpleDesign && (
          <div className="w-20">
            <div className="flex justify-center text-3xl">
              <span className="text-principal-700">
                <AiFillFileAdd />
              </span>
            </div>
            <p className="truncate text-sm">Agregar</p>
          </div>
        )}
        {files?.length &&
          files?.map((file, idx) => {
            return (
              <div key={"upload_file_" + idx} className="w-20">
                <div className="flex justify-center text-3xl">
                  {file.name.toLowerCase().endsWith(".pdf") ? (
                    <span className="text-principal-500">
                      <BsFillFileEarmarkPdfFill title={file.name} />
                    </span>
                  ) : (
                    <FcImageFile title={file.name} />
                  )}
                </div>
                <p className="truncate font-light text-sm" title={file.name}>
                  {file.name}
                </p>
              </div>
            );
          })}
      </CardManageSection>
      {files && files?.length >= 1 && (
        <div className="w-full flex justify-end pr-10">
          <p className="text-principal-180 font-light text-sm">
            N° Archivos {files?.length}
          </p>
        </div>
      )}
    </div>
  );
};
