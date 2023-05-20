import React, { useState } from 'react';
import { useInputTextValidation } from './useInputTextValidation';

// -----------------------------------------------------------------

export interface useInputText {
  name: string;
  placeholder: string;
  inputValue: string;
  reg?: RegExp;
  required?: boolean;
}

export interface useInputTextResult {
  // default
  name: string;
  placeholder: string;
  // useInputText
  value: string;
  setValue: Function;
  paste: string;
  reset: Function;
  onChange: Function;
  onBlur: Function;
  onPaste: Function;
  // Validation
  error: boolean;
  errorText: string;
  valid: boolean;
}

// -----------------------------------------------------------------

export function useInputText({ name, placeholder, inputValue, reg, required = false }: useInputText) {
  const [value, setValue] = useState<string>(inputValue);
  const [isVisited, setIsVisited] = useState<boolean>(false);
  const [paste, setPaste] = useState<string>('');
  // validation
  const validation = useInputTextValidation({ value, reg, required, isVisited });
  const { error, errorText, valid, setError, setValid } = validation;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsVisited(true);
  };

  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardData = e.clipboardData;
    setPaste(clipboardData?.getData('text'));
  };

  const reset = () => {
    setValue('');
    setValid(false);
    setError(false);
  };

  return {
    // default
    name,
    placeholder,
    // useInputText
    value,
    setValue,
    paste,
    reset,
    onChange,
    onPaste,
    onBlur,
    // Validation
    error,
    errorText,
    valid,
  };
}
