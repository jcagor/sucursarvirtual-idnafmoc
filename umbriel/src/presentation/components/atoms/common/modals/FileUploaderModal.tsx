import { FileUploaderModalProps } from '@/types/fileUploader';

export const FileUploaderModal: React.FC<FileUploaderModalProps> = ({ 
  onClose, 
  children, 
  className 
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-principal-50 bg-opacity-30"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-principal-150 p-6 rounded-lg shadow-lg w-96 ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}; 