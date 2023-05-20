import React, { useState } from 'react';
import './inputText.scss';
import { useInputTextResult } from './useInputText';

// ----------------------------------------------------------------------

export interface InputText {
  defaut: useInputTextResult;
  events?: InputTextEvents;
}

interface InputTextEvents {
  // onChange?: any;
  onPaste?: any;
}

// ----------------------------------------------------------------------

export default function InputText({ defaut, events }: InputText) {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const { name, placeholder, value, onChange, onBlur, error, errorText } = defaut;

  const onFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFocus(true);
  };

  const onBlurFunction = () => {
    setInputFocus(false);
    onBlur();
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

          <div className="inputInput">
            <input
              name={name}
              type={'text'}
              value={value}
              onFocus={onFocus}
              onBlur={onBlurFunction}
              onChange={(e) => onChange(e)}
              {...events}
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
