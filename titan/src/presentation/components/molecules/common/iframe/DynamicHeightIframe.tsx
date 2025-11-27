import React, { FC, useEffect, useRef, useState } from "react";
import { Spinner } from "presentation";

type DynamicHeightIframeProps = {
  src: string;
  className: string;
  sizeIframe: number;
};

const DynamicHeightIframe: FC<DynamicHeightIframeProps> = ({
  src,
  className,
  sizeIframe = 3,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  let z = true;
  let initialHeight = 0;

  const resizeIframeToFitContent = () => {
    setIsLoading(false);
    if (iframeRef.current && z) {
      initialHeight =
        initialHeight === 0 ? iframeRef.current.offsetHeight : initialHeight;
      iframeRef.current.style.height = `${
        iframeRef.current.offsetHeight * sizeIframe
      }px`;
      z = false;
      // iframeRef.current.style.height = `${iframeRef.current.contentWindow?.document.body.scrollHeight}px`;
    }
  };

  const handleIframeLoad = (event: any) => {
    // if (event.data && event.data.type === 'iframeHeight' && event.data.height) {
    //   }
    setTimeout(resizeIframeToFitContent, 200); // Añade un pequeño retraso para asegurarte de que el contenido del iframe esté completamente cargado
  };
  useEffect(() => {
    const handleMessage = (event: any) => {
      if (
        event.data &&
        event.data.type === "iframeHeight" &&
        event.data.height
      ) {
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="overflow-y-hidden">
      <iframe
        ref={iframeRef}
        src={src}
        frameBorder="0"
        scrolling="no"
        allowFullScreen={true}
        className={`${className} opacity-0 ${
          isLoading ? "" : "opacity-100"
        } pb-5`}
        onLoad={handleIframeLoad}
      />
      <Spinner
        className={`${isLoading ? "" : "hidden"} absolute top-0 left-1/3`}
      />
    </div>
  );
};

export default DynamicHeightIframe;
