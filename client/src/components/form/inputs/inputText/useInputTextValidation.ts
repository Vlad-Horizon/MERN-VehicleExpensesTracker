import { useState, useEffect } from 'react';

// -----------------------------------------------------------------

interface useInputTextValidation {
  value: string;
  reg?: RegExp;
  required?: boolean;
  isVisited: boolean;
}

// -----------------------------------------------------------------

const errorsList = {
  ua: {
    require: 'Це обов`язкове поле',
    invalid: 'Помилка введених даних',
  },
};

// -----------------------------------------------------------------

export function useInputTextValidation({ value, reg, required = false, isVisited }: useInputTextValidation) {
  const [valid, setValid] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const setErrorFunction = (errorInputText: string) => {
    setValid(false);
    if (isVisited) {
      setError(true);
      setErrorText(errorInputText);
    }
  };

  useEffect(() => {
    const checkValueResult = checkValue();
    const checkRequiredResult = checkRequired();

    if (!checkRequiredResult) {
      setErrorFunction(errorsList.ua.require);
      return;
    }

    if (!checkValueResult) {
      setErrorFunction(errorsList.ua.invalid);
      return;
    }

    setValid(true);
    setError(false);
    setErrorText('');
  }, [value, isVisited]);

  // check errors
  const checkValue = () => {
    if (!reg) return true;
    return reg.test(value);
  };

  const checkRequired = () => {
    if (!required) return true;
    return value.trim().length !== 0;
  };

  return {
    valid,
    setValid,
    error,
    setError,
    errorText,
  };
}
