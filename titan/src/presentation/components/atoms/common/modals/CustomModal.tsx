import { AnimatePresence, motion } from "framer-motion";
import React, { FC } from "react";

interface CustomModalProps {
  children: React.ReactNode;
  key: string;
  lock?: boolean;
  open?: boolean;
  setOpen: (val: boolean) => void;
  containerClass?: string;
}

const CustomModal: FC<CustomModalProps> = ({
  children,
  key,
  setOpen,
  lock = false,
  open = false,
  containerClass,
}) => {
  const handleOutsideClick = () => {
    if (lock) return;
    setOpen(false);
  };

  return (
    <React.Fragment>
      {open && (
        <div
          className={`w-screen h-screen absolute top-0 left-0 z-[90000] flex justify-center items-center bg-principal-800`}
          onClick={handleOutsideClick}
        >
          <AnimatePresence>
            <motion.div
              key={key}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 15, stiffness: 200 }}
              className={`relative rounded-[20px] flex flex-col items-center shadow-lg bg-principal-150 ${containerClass} subpixel-antialiased`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </React.Fragment>
  );
};

export { CustomModal };
