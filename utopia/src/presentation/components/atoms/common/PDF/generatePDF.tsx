"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { addAlert } from "presentation/store/slices/alertSlice";
import { AppDispatch } from "presentation/store";

export async function generatePDF<T extends object>({
  TemplatePDF,
  propsTemplatePDF,
  namePDF,
  renderWaitTime = 300,
  returnFile = false,
  showLoadingModal = false,
  dispatch,
}: {
  TemplatePDF: React.FC<T>;
  propsTemplatePDF: T;
  namePDF: string;
  returnFile?: boolean;
  renderWaitTime?: number;
  showLoadingModal?: boolean;
  dispatch?: AppDispatch;
}) {
  let modalContainer: HTMLElement | null = null;

  try {
    // ✅ 1️⃣ Mostrar modal si se solicita
    if (showLoadingModal) {
      modalContainer = document.createElement("div");
      modalContainer.id = "pdf-loading-modal";
      modalContainer.innerHTML = ReactDOMServer.renderToString(
        <LoadingModal />
      );
      document.body.appendChild(modalContainer);
    }

    // ✅ 2️⃣ Crear contenedor oculto del PDF
    const contenedor = document.createElement("div");
    contenedor.style.position = "fixed";
    contenedor.style.top = "-9999px";
    contenedor.style.left = "-9999px";
    contenedor.style.width = "210mm"; // tamaño A4 ancho
    contenedor.style.backgroundColor = "white";
    contenedor.innerHTML = ReactDOMServer.renderToString(
      <TemplatePDF {...propsTemplatePDF} />
    );
    document.body.appendChild(contenedor);

    // ✅ 3️⃣ Esperar render
    await new Promise((r) => setTimeout(r, renderWaitTime));

    // ✅ 4️⃣ Capturar con html2canvas
    const canvas = await html2canvas(contenedor, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;

    // ✅ 5️⃣ Dividir en páginas si es necesario
    let position = 0;
    let remainingHeight = pageHeight;
    const pageHeightMM = pdf.internal.pageSize.getHeight();

    while (remainingHeight > 0) {
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, pageHeight);
      remainingHeight -= pageHeightMM;
      if (remainingHeight > 0) pdf.addPage();
      position -= pageHeightMM;
    }

    // ✅ 6️⃣ Descargar o devolver file
    if (returnFile) {
      // 👉 Convertir a blob y luego a File
      const blob = pdf.output("blob");
      const file = new File([blob], namePDF, { type: "application/pdf" });
      return file; // 🔹 Se devuelve el File
    } else {
      pdf.save(namePDF); // 🔹 Descarga directa
    }
  } catch (error) {
    dispatch?.(
      addAlert({
        message: "Ha ocurrido un error al generar el PDF",
        type: "error",
      })
    );
    console.error("Error generando PDF:", error);
  } finally {
    // ✅ 7️⃣ Limpiar DOM
    const contenedor = document.querySelector("#pdf-temp-container");
    if (contenedor) document.body.removeChild(contenedor);
    if (modalContainer) document.body.removeChild(modalContainer);
  }
}

const LoadingModal = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-principal-50 bg-opacity-30 z-[9999]">
    <div className="bg-principal-150 p-6 rounded-lg shadow-lg flex flex-col items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-principal-180 transition-all duration-500" />
      <div className="text-principal-180 mt-2">Cargando...</div>
    </div>
  </div>
);
