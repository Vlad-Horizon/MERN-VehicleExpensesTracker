import React, { useState } from "react";
import { useValidationInputText } from "./useValidationInputText";

// -----------------------------------------------------------------

interface hookProps {
  name: string,
  label: string,
  inputValue: string, 
  reg?: RegExp,
  required?: boolean,
  submit: boolean,
}

// -----------------------------------------------------------------

export function useInputText({name, label, inputValue, reg, required = false, submit}: hookProps) {
  const [value, setValue] = useState<string>(inputValue);
  const [paste, setPaste] = useState<string>('');
  const validation = useValidationInputText({value, reg, required, submit});
  const {error, errorText, valid, setError, setValid} = validation;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardData = e.clipboardData;
    setPaste(clipboardData?.getData('text'));
  }

  const reset = () => {
    setValue('');
    setValid(false);
    setError(false);
  }

  return {
    name,
    label,
    value,
    setValue,
    paste,
    reset,
    onChange,
    onPaste,
    // Validation
    error,
    errorText,
    valid,
  }
}