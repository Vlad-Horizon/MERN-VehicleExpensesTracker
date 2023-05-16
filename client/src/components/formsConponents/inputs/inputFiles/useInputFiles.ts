import { useState, useEffect, useRef } from "react";
import { toBase64 } from "../../../../utils/toBase64";

// -----------------------------------------------------------------

interface hockProps {
  name: string,
  label: string,
  required?: boolean,
  submit: boolean,
  accept?: string,
  multifile?: boolean,
}

interface filesInterface {
  file: File,
  base64: string,
  url: string,
}

// -----------------------------------------------------------------

const errorsList = {
  ua: {
    require: 'Це обов`язкове поле',
    invalid: 'Помилка формату файлу, допустимі формати файлу: ',
    invalidFiles: 'Помилка формату файлу або файлів, допустимі формати файлу: '
  }
}

// -----------------------------------------------------------------

export function useInputFiles({name, label, required = false, submit, accept = '', multifile = false}: hockProps) {
  const [files, setFiles] = useState<Array<File> | null>(null);
  const [filesSorted, setFilesSorted] = useState<filesInterface[]>([]);
  
  const [valid, setValid] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  
  const extensions = accept.replace(/[\.]*[,]*/g, '').split(' ').filter((ext) => ext.length > 0);
  const pattern = new RegExp(`/(${extensions.join('|')})$`);
  
  useEffect(() => {
    sortFiles();
  }, [files])

  useEffect(() => {
    validation();
  }, [files, submit, required, pattern, accept])

  const validation = () => {
    setValid(false);

    if (submit) {
      if (!files && required) {
        setError(true);
        setErrorText(errorsList.ua.require);
        return;
      }
    }
    
    if (!files) return;

    for (const file of files) {
      if (!pattern.test(file.type)) {
        setError(true);
        setErrorText(errorsList.ua.invalid + accept);
        return;
      }
    }

    setError(false);   
    setValid(true);
  }

  const sortFiles = () => {
    if (!files) return;

    const newSortedFiles: filesInterface[] = [];

    const promises = files.map((file) => {
      let sotrFormat = {
        file: file,
        base64: '',
        url: '',
      }

      return toBase64(file).then(
        (result) => {
          sotrFormat.base64 = result;
          sotrFormat.url = file && URL.createObjectURL(file);

          newSortedFiles.push(sotrFormat);
        }
      );
    });
    
      Promise.all(promises).then(
        () => {
          setFilesSorted(filesSorted.concat(newSortedFiles));
          setFiles(null);
        }
      ).catch(
        (error) => console.error(error)
      );
  }

  return {
    name,
    label,
    accept,
    multifile,
    setFilesSorted,
    files: filesSorted, 
    setFiles,
    valid,
    error,
    errorText,
  }
}