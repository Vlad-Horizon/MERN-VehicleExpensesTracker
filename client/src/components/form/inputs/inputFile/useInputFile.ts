import React, { useEffect, useState } from 'react';
import { useInputAddFiles } from './useInputFilesAddFiles';
import { useInputFilesFilter } from './useInputFilesFilter';

// -----------------------------------------------------------------

export interface useInputFile {
  name: string;
  placeholder: string;
  required?: boolean;
  accept?: string; // дозволені файли
  multiple?: boolean;
  size?: number;
}

export interface useInputFileObject {
  file: File;
  base64: string;
  url: string;
}

export interface useInputFileResult {
  name: string;
  placeholder: string;
  valid: boolean;
  value: boolean;
  error: boolean;
  errorText: string;
  objectFiles: useInputFileObject[];
  required: boolean;
  multiple: boolean;
  setFiles: Function;
  onBlur: Function;
}

// -----------------------------------------------------------------

export function useInputFiles({
  name,
  placeholder,
  required = false,
  accept = '',
  multiple = false,
  size = 0,
}: useInputFile) {
  const [files, setFiles] = useState<Array<File> | null>(null);
  const [isVisited, setIsVisited] = useState<boolean>(false);

  const filterFiles = useInputFilesFilter({ accept, size, files, setFiles });
  const { valid, error, errorText } = filterFiles;

  const addFiles = useInputAddFiles({ files, setFiles, error });
  const { objectFiles } = addFiles;

  const onBlur = () => {
    setIsVisited(true);
  };

  return {
    name,
    placeholder,
    valid,
    value: objectFiles.length > 0,
    error,
    errorText,
    objectFiles,
    required,
    multiple,
    setFiles,

    onBlur,
  };
}
