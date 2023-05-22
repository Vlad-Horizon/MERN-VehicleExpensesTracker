import React, { useRef, useState } from 'react';
import { useFileInputsResult } from '../../inputsInterfaces/toFileInputs';
import './inputFile.scss';

// ----------------------------------------------------------------------

interface InputFile {
  defaultProps: useFileInputsResult;
}

// ----------------------------------------------------------------------

export default function InputFile({ defaultProps }: InputFile) {
  const { name, placeholder, error, errorText, objectFiles, multiple, setFiles, onBlur } = defaultProps;
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  const onClick = () => inputRef.current.click();
  const onFocus = () => setInputFocus(true);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles(newFiles);
  };

  const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      inputRef.current.click();
    }
  };

  const onBlurFunction = () => {
    setInputFocus(false);
    onBlur();
  };

  const labelText = () => {
    if (objectFiles.length === 0) return placeholder;
    else if (multiple && objectFiles.length > 0) return `Is load: ${objectFiles.length} files`;
    else if (!multiple && objectFiles.length > 0) return objectFiles[0].file.name;
  };

  return (
    <>
      <div className="inputFile">
        <div
          className={`input
            ${error ? 'inputError' : 'inputNoError'}
            ${inputFocus ? 'inputFocus' : ''}
            ${objectFiles.length > 0 ? 'inputIsChange' : ''}
          `}
        >
          <label htmlFor={name}>{labelText()}</label>

          <div
            className="inputInput"
            onClick={onClick}
            onKeyDown={keyPress}
            tabIndex={0}
            onFocus={onFocus}
            onBlur={onBlurFunction}
          >
            <input
              ref={inputRef}
              name={name}
              type="file"
              multiple={multiple}
              hidden
              style={{ visibility: 'hidden' }}
              onChange={handleImageUpload}
            />

            <fieldset>
              <legend>
                <span>{placeholder}</span>
              </legend>
            </fieldset>
          </div>

          {error && <div className="inputTextError">{errorText}</div>}
        </div>
      </div>
    </>
  );
}
