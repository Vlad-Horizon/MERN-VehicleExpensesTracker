import React, { useRef, useState } from 'react';
import './inputFile.scss';
import { useInputFileResult } from './useInputFile';

// ----------------------------------------------------------------------

interface InputFile {
  defaultProps: useInputFileResult;
}

// ----------------------------------------------------------------------

export default function InputFile({ defaultProps }: InputFile) {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const { name, placeholder, valid, value, error, errorText, objectFiles, required, multiple, setFiles, onBlur } =
    defaultProps;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    // setFile(newFiles);
  };

  const onFocus = () => {
    setInputFocus(true);
  };

  const onBlurFunction = () => {
    setInputFocus(false);
    onBlur();
  };

  const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div className="inputComponents inputFile">
        <div
          className={`input 
            ${error ? 'inputError' : 'inputNoError'}
            ${inputFocus ? 'inputFocus' : ''}
            ${value ? 'inputIsChange' : ''}
          `}
        >
          <label htmlFor={name}>{placeholder}</label>

          <div
            className="inputInput"
            onClick={() => inputRef.current.click()}
            onKeyDown={(e) => keyPress(e)}
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
              onChange={(e) => handleImageUpload(e)}
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
