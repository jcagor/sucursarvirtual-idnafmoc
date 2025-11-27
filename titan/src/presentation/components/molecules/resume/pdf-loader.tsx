import dynamic from "next/dynamic";

const PdfLoader = dynamic(() => import("./pdf-preview"), {
  ssr: false,
});

export default PdfLoader;
