import React, { useEffect, useState } from 'react';

// -----------------------------------------------------------------

export interface useInputFileFilter {
  files: Array<File> | null;
  accept: string;
  size: number;
  required: boolean;
  objectFiles: number;
  setFiles: Function;
}

// -----------------------------------------------------------------

const errorsList = {
  ua: {
    require: 'Це обов`язкове поле',
    invalid: 'Помилка формату файлу, допустимі формати файлу: ',
    invalidFiles: 'Помилка формату файлу або файлів, допустимі формати файлу: ',
  },
};

// -----------------------------------------------------------------

export const useInputFilesFilter = ({ accept, size, files, setFiles, objectFiles, required }: useInputFileFilter) => {
  const [isVisited, setIsVisited] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const extensions = accept
    .replace(/[\.]*[,]*/g, '')
    .split(' ')
    .filter((ext) => ext.length > 0);
  const extensionsPattern = new RegExp(`/(${extensions.join('|')})$`);

  useEffect(() => {
    filterFiles();
  }, [files]);

  useEffect(() => {
    checkRequired();
  }, [, objectFiles, isVisited, required]);

  const checkSize = (fileSize: number) => {
    if (!size) return true;
    if (size === 0) return true;
    return size >= fileSize;
  };

  const setErrorFunction = (errorMessage: string) => {
    setValid(false);
    setError(true);
    setErrorText(errorMessage);
    setFiles(null);
  };

  const filterFiles = () => {
    if (!files) return;

    for (const file of files) {
      if (checkSize(file.size)) {
        setErrorFunction('file.size');
        break;
      }

      if (!extensionsPattern.test(file.type) && accept) {
        setErrorFunction(errorsList.ua.invalid + accept);
        break;
      }
    }

    setError(false);
    setValid(true);
    return;
  };

  const onBlur = () => {
    setIsVisited(true);
  };

  const checkRequired = () => {
    if (isVisited && required && objectFiles === 0) {
      setValid(false);
      setError(true);
      setErrorText(errorsList.ua.require);
    } else {
      setValid(true);
      setError(false);
      setErrorText('');
    }
  };

  return {
    valid,
    error,
    errorText,
    onBlur,
    isVisited,
  };
};
