export interface useFileInputs {
  name: string;
  placeholder: string;
  required?: boolean;
  accept?: string; // дозволені файли
  multiple?: boolean;
  size?: number;
}

export interface useFileInputsResult {
  name: string;
  placeholder: string;
  isDrag: boolean;
  valid: boolean;
  error: boolean;
  errorText: string;
  objectFiles: useFileInputsObject[];
  required: boolean;
  multiple: boolean;
  setFiles: Function;
  onBlur: Function;

  handleDragOver: Function;
  handleDragLeave: Function;
  handlerDrop: Function;
}

export interface useFileInputsObject {
  file: File;
  base64: string;
  url: string;
}
