import React, { useEffect, useState } from 'react';
import { toBase64 } from '../../../../utils/toBase64';
import { useInputFileObject } from './useInputFile';

// -----------------------------------------------------------------

export interface useInputFileFilter {
  files: File[] | null;
  setFiles: Function;
  error: boolean;
}

// -----------------------------------------------------------------

export const useInputAddFiles = ({ files, setFiles, error }: useInputFileFilter) => {
  const [objectFiles, setObjectFiles] = useState<useInputFileObject[]>([]);

  useEffect(() => {
    if (!error) {
      addFilesToObjectFiles();
    }
  }, [files, error]);

  const addFilesToObjectFiles = () => {
    if (!files) return;

    const newSortedFiles: useInputFileObject[] = [];

    const promises = files.map(async (file) => {
      let sotrFormat = {
        file: file,
        base64: '',
        url: '',
      };

      return toBase64(file).then((result) => {
        sotrFormat.base64 = result;
        sotrFormat.url = file && URL.createObjectURL(file);

        newSortedFiles.push(sotrFormat);
      });
    });

    Promise.all(promises)
      .then(() => {
        setObjectFiles(objectFiles.concat(newSortedFiles));
        setFiles(null);
      })
      .catch((error) => console.error(error));
  };

  return {
    objectFiles,
  };
};
