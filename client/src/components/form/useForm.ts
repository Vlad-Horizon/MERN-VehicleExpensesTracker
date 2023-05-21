import React, { useEffect, useState } from 'react';
import { useInputTextResult } from './inputs/inputText/useInputText';

// ----------------------------------------------------------------------

interface useForm {
  inputs: { [key: string]: useInputTextResult };
  submitFunction: Function;
}

// ----------------------------------------------------------------------

export function useForm({ inputs, submitFunction }: useForm) {
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    const inputsArray = Object.values(inputs);
    const valisStatys = inputsArray.every((input) => input.valid);

    if (valisStatys) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [inputs]);

  const submit = () => {
    if (!valid) return;
    submitFunction();
  };

  return {
    valid,
    submit,
    //
    inputs,
  };
}
