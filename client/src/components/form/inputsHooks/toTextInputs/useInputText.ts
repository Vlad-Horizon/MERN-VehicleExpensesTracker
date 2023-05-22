import React, { useState } from 'react';
import { useTextInputs } from '../../inputsInterfaces/toTextInputs';
import { useInputTextValidation } from './useInputTextValidation';

// -----------------------------------------------------------------

export function useInputText({ name, placeholder, inputValue, reg, required = false }: useTextInputs) {
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
