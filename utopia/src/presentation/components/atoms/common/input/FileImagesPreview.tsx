"use client";

import { FormCustomFileEntity, S3FileList } from "domain/models";
import { useEffect, useState } from "react";

interface FileImagesPreviewProps {
  imagesData: S3FileList;
  readOnly?: boolean;
  OnChange?: Function;
}

export const FileImagesPreview = (props: FileImagesPreviewProps) => {
  const [imagePreview, setImagePreview] = useState<S3FileList | null>(null);

  const [imageMark, setImageMark] = useState<Array<number>>([]);

  const handleImage = (file: FormCustomFileEntity) => {
    if (file) {
      const base64 = `data:${file.type};base64,` + file.data;
      //setImagePreview(base64);
      return base64;
    }
  };

  const setMark = (id: number) => {
    //console.log("mark", id);
    setImageMark((prevState) => {
      //if (id) {
      const find = prevState.filter((value) => value == id);
      //console.log("find mark image", find);
      if (find && find.length >= 1) {
        const filtered = prevState.filter((value) => value != id);
        return filtered;
      } else {
        return [...prevState, id];
      }
      /*} else {
        return [id];
      }*/
    });
  };

  const checkMark = (id: number, data: Array<number>): boolean => {
    //console.log("check", id, data);
    const found = data.find((v) => v == id);
    if (found !== undefined) {
      //console.log("check true", found)
      return true;
    }
    //console.log("check false", found)
    return false;
  };

  useEffect(() => {
    setImagePreview(props.imagesData);
  }, [props.imagesData]);

  useEffect(() => {
    //console.log(imageMark);
    if (props.OnChange) {
      props.OnChange(imageMark);
    }
  }, [imageMark]);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-4 p-4 bg-principal-150 rounded-md border-2 border-principal-400">
        <div className="grid grid-cols-2 gap-4">
          {imagePreview && imagePreview.length >= 1 ? (
            imagePreview.map((image, index) => {
              let imageData = `/utopia/api/img?url=${encodeURIComponent(
                image.toString()
              )}`; //decodeS3ImageUrl(image);
              return (
                <div key={"container-evidence-img"+index} className="relative inline-block">
                  <img
                    key={"evidence-img-" + index}
                    src={imageData}
                    alt="Previsualización"
                    className="max-w-xs max-h-64 rounded-lg shadow"
                    onClick={() => {
                      if (!props.readOnly) {
                        setMark(index);
                      }
                    }}
                  />
                  {checkMark(index, imageMark) && (
                    <img
                      src="/utopia/icons/fail.webp"
                      alt="ELIMINAR"
                      onClick={() => {
                        if (!props.readOnly) {
                          setMark(index);
                        }
                      }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 shadow"
                    />
                  )}
                </div>
              );
            })
          ) : (
            <p>No se encuentra información!</p>
          )}
        </div>
      </div>
    </div>
  );
};
