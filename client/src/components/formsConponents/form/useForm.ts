import React, { useEffect, useState } from "react";

interface useFormProps {
  inputs: boolean[],
}

export function useForm({inputs}: useFormProps) {
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    const isEveryInputFalse = inputs.every((input) => input === false);
    if (isEveryInputFalse) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [inputs])

  return {
    valid,
  }
}