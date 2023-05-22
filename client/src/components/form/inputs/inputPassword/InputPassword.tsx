import React, { useState } from 'react';
import './inputPassword.scss';
import RadioButton from '../../../radioButton/RadioButton';
import { PasswordHidn, PasswordView } from '../../../../assets';
import { InputText } from '../inputText/InputText';

// ----------------------------------------------------------------------

export default function InputPassword({ defaultProps, events }: InputText) {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const { name, placeholder, value, onChange, onBlur, error, errorText } = defaultProps;

  const onFocus = () => setInputFocus(true);
  const onClickViewPassword = () => setVisiblePassword(!visiblePassword);

  const onBlurFunction = () => {
    setInputFocus(false);
    onBlur();
  };

  return (
    <>
      <div className="inputComponents inputText inputPassword">
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
              type={visiblePassword ? 'text' : 'password'}
              value={value}
              onFocus={onFocus}
              onBlur={onBlurFunction}
              onChange={(e) => onChange(e)}
              {...events}
            />

            <RadioButton
              children={visiblePassword ? <PasswordView /> : <PasswordHidn />}
              events={{ onClick: onClickViewPassword }}
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
