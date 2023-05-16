import React, {useState, useEffect} from 'react'

// -----------------------------------------------------------------

import './input.scss'

// -----------------------------------------------------------------

interface compotentProps {
  name: string,
  viewName: string,
  value: string,
  error?: boolean,
  errorText?: string,
  events?: componentEvents,
}

interface componentEvents {
  onChange?: any,
  onPaste?: any,
}

// -----------------------------------------------------------------

export default function InputText({name, viewName, value, error, events, errorText}: compotentProps) {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  
  return (
    <div className='componentName_TextInput'>
      <div className={`inputContainer_TextInput 
          ${error ? 'error_TextInput' : 'normal_TextInput'}
          ${inputFocus ? 'focus_TextInput' : ''}
          ${value ? 'value_TextInput' : ''}
        `}
      >

        <label htmlFor={name}>{viewName}</label>

        <div className='input_TextInput'>
          <input 
            name={name} 
            type={'text'}
            value={value} 
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)} 
            {...events}
          />

          <fieldset>
            <legend>
              <span>{viewName}</span>
            </legend>
          </fieldset>
        </div>

        {
          error && (
            <div className='textError_TextInput'>{errorText}</div>
          )
        }

      </div>
    </div>
  )
}