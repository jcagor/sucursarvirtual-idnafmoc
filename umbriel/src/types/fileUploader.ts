export interface FileUploaderButtonLabels {
  cancel?: string;
  confirm?: string;
}

export interface FileUploaderModalConfig {
  title: string;
  description: string;
  showModal?: boolean;
}

export interface FileUploaderBaseProps {
  title: string;
  description: string;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  onFileUpload: (file: File) => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  previewComponent?: React.ReactNode;
  buttonLabels?: FileUploaderButtonLabels;
  modalConfig?: FileUploaderModalConfig;
}

export interface FileUploaderModalProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
} 