"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs";
import * as pdfjsLib from "pdfjs-dist/webpack";

interface Props {
  pdfData?: ArrayBuffer;
}

export default function PdfPreview({ pdfData }: Props) {
  const resumeDocument = useRef<HTMLDivElement | null>(null);
  let renderStart = false;
  const [pdfRendered, setPdfRendered] = useState(false);
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    pdfjsWorker,
    import.meta.url
  ).toString();

  useEffect(() => {
    if (pdfData) {
      const renderPDF = async (response: ArrayBuffer) => {
        if (renderStart) {
          return;
        }
        renderStart = true;
        const loadingTask = pdfjsLib.getDocument(response);
        const pdf = await loadingTask.promise;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.2 });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;          
          
          if (context != null){
            await page.render({
              canvasContext: context,
              canvas:canvas,
              viewport: viewport,
            }).promise;
  
            resumeDocument.current?.appendChild(canvas);
          }
        }
        setPdfRendered(true);
        renderStart = false;
      };

      renderPDF(pdfData);
    }
  }, [pdfData]);

  return (
    <div ref={resumeDocument} className="grid h-full gap-y-4">
      {!pdfRendered && (
        <div>
          <p>
            Cargando previsualización, puedes descargar el archivo usando el
            botón a la derecha
          </p>
        </div>
      )}
    </div>
  );
}
