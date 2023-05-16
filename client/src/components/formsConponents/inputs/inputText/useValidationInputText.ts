import { useState, useEffect } from "react";

// -----------------------------------------------------------------

interface hockProps {
  value: string,
  reg?: RegExp,
  required?: boolean,
  submit: boolean,
}

// -----------------------------------------------------------------

const errorsList = {
  ua: {
    require: 'Це обов`язкове поле',
    invalid: 'Помилка введених даних'
  }
}

// -----------------------------------------------------------------

export function useValidationInputText({value, reg, required = false, submit}: hockProps) {
  const [valid, setValid] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  useEffect(() => {
    if (checkValue()) {
      setValid(true);
    }

    if (!submit) return

    if (!checkRequired()) {
      setValid(false);
      setError(true);
      setErrorText(errorsList.ua.require);
      return;
    }

    if (!checkValue()) {
      setValid(false);
      setError(true);
      setErrorText(errorsList.ua.invalid);
      return;
    }

    setError(false);
    setValid(true);
  }, [value, submit])

  // check errors
  const checkValue = () => {
    if (!reg) return true;
    return reg.test(value);
  }

  const checkRequired = () => {
    if (required) return true;
    return value.trim().length === 0 && required;
  }

  return {
    valid,
    error,
    errorText,
    // private
    setValid,
    setError
  }
}