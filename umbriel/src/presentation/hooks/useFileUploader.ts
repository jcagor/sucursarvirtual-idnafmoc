'use client';

import { useState, useCallback } from 'react';

interface UseFileUploaderProps {
  maxFileSize?: number;
  onFileUpload: (file: File) => Promise<void>;
}

export const useFileUploader = ({ maxFileSize, onFileUpload }: UseFileUploaderProps) => {
  const [filePreview, setFilePreview] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (maxFileSize && file.size > maxFileSize) {
      alert(`El archivo excede el tamaño máximo permitido de ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }

    setFilePreview(file);
    setOpenModal(true);
  }, [maxFileSize]);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

    if (maxFileSize && file.size > maxFileSize) {
      alert(`El archivo excede el tamaño máximo permitido de ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }

    setFilePreview(file);
    setOpenModal(true);
  }, [maxFileSize]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  }, []);

  const resetFilePreview = useCallback(() => {
    setFilePreview(null);
    setOpenModal(false);
  }, []);

  return {
    filePreview,
    dragActive,
    openModal,
    setOpenModal,
    handleFileChange,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    resetFilePreview
  };
}; 