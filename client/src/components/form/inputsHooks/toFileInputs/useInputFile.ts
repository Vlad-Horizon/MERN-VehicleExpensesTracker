import React, { useEffect, useState } from 'react';
import { useFileInputs } from '../../inputsInterfaces/toFileInputs';
import { useInputAddFiles } from './useInputFilesAddFiles';
import { useInputFilesFilter } from './useInputFilesFilter';

// -----------------------------------------------------------------

export function useInputFiles({
  name,
  placeholder,
  required = false,
  accept = '',
  multiple = false,
  size = 0,
}: useFileInputs) {
  const [files, setFiles] = useState<Array<File> | null>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const { objectFiles } = useInputAddFiles({ files, setFiles, multiple });
  const { valid, error, errorText, onBlur } = useInputFilesFilter({
    accept,
    size,
    files,
    setFiles,
    required,
    objectFiles: objectFiles.length,
  });

  // Drag and drop
  const handlerDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    if (file.length > 1 && !multiple) {
      setIsDrag(false);
      return;
    }

    const newFiles: Array<File> = Array.from(file);
    setFiles(newFiles);
    setIsDrag(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDrag(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDrag(false);
  };

  return {
    name,
    placeholder,
    valid,
    error,
    errorText,
    objectFiles,
    required,
    multiple,
    setFiles,

    isDrag,
    handleDragOver,
    handleDragLeave,
    handlerDrop,

    onBlur,
  };
}
