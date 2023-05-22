import React, { useEffect, useState } from 'react';
import { toBase64 } from '../../../../utils/toBase64';
import { useFileInputsObject } from '../../inputsInterfaces/toFileInputs';

// -----------------------------------------------------------------

export interface useInputFileFilter {
  files: File[] | null;
  setFiles: Function;
  multiple: boolean;
}

// -----------------------------------------------------------------

export const useInputAddFiles = ({ files, setFiles, multiple }: useInputFileFilter) => {
  const [objectFiles, setObjectFiles] = useState<useFileInputsObject[]>([]);

  useEffect(() => {
    addFilesToObjectFiles();
  }, [files]);

  const addFilesToObjectFiles = () => {
    if (!files) return;

    const newSortedFiles: useFileInputsObject[] = [];

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
        setObjectFiles(multiple ? objectFiles.concat(newSortedFiles) : newSortedFiles);
        setFiles(null);
      })
      .catch((error) => console.error(error));
  };

  return {
    objectFiles,
  };
};
