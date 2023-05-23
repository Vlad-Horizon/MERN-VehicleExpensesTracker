import React, { useEffect, useState } from 'react';
import { useFileInputsResult } from './inputsInterfaces/toFileInputs';
import { useTextInputsResult } from './inputsInterfaces/toTextInputs';

// ----------------------------------------------------------------------

interface useForm {
  textInputs?: { [key: string]: useTextInputsResult };
  fileInputs?: { [key: string]: useFileInputsResult };
  submitFunction: Function;
}

// ----------------------------------------------------------------------

export default function useForm({ textInputs = {}, fileInputs = {}, submitFunction }: useForm) {
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    let valisStatysText = false;
    let valisStatysFile = false;

    if (textInputs) {
      const inputsArray = Object.values(textInputs);
      valisStatysText = inputsArray.every((input) => input.valid);
    } else {
      valisStatysText = true;
    }

    if (fileInputs) {
      const inputsArray = Object.values(fileInputs);
      valisStatysFile = inputsArray.every((input) => input.valid);
    } else {
      valisStatysFile = true;
    }

    if (valisStatysText && valisStatysFile) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [textInputs, fileInputs]);

  const submit = () => {
    if (!valid) return;
    submitFunction();
  };

  return {
    valid,
    submit,
    //
    textInputs,
    fileInputs,
  };
}
