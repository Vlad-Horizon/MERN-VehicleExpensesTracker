export interface useTextInputs {
  name: string;
  placeholder: string;
  inputValue: string;
  reg?: RegExp;
  required?: boolean;
  errorTextInvalid?: string
}

export interface useTextInputsResult {
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
