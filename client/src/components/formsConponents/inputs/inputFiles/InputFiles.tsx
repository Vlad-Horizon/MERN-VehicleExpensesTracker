import React, {useState, useEffect, useRef} from 'react'

// -----------------------------------------------------------------

import './inputFiles.scss'

// -----------------------------------------------------------------

interface compotentProps {
  name: string,
  label: string,
  file: filesInterface[] | null,
  setFile: Function,
  accept?: string | '',
  error?: boolean,
  errorText?: string,
  multiple?: boolean,
}

interface filesInterface {
  file: File,
  base64: string,
  url: string,
}
// -----------------------------------------------------------------

export default function InputFiles({name, label, file, setFile, accept, error, errorText, multiple = false}: compotentProps) {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  // click download
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFile(newFiles);
  };

  // DragAndDrop download
  const handlerDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files;
    if (file?.length === 1) {
      setFile(file[0]);
      setIsDrag(false);
      return;
    }
    setFile(file);
    setIsDrag(false);
  }
  
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDrag(true);
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setIsDrag(false);    
  }

  const keyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      inputRef.current.click()
    }
  }
  
  return (
    <div className='componentName_InputFile'>
      <div 
        className={`inputContainer_InputFile 
          ${error ? 'error_InputFile' : 'normal_InputFile'}
          ${inputFocus ? 'focus_InputFile' : ''}
          ${file ? 'dropChange_InputFile' : ''}
          ${isDrag ? 'isDrop_InputFile' : ''}
        `}
      >
        {/* {(file instanceof File) && (<label htmlFor='dropInput'>{file.name}</label>)} */}
        {(file && file?.length > 0) && (<label htmlFor='dropInput'>{`Is load: ${file.length} files`}</label>)}
        {(!file || file.length === 0) && (<label htmlFor='dropInput'>Drag and Drop or click to select file</label>)}
        
        <div 
          className='input_InputFile' style={{cursor: 'pointer'}}
          onClick={() => inputRef.current.click()}
          onKeyDown={(e) => keyPress(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDragLeave={(e) => handleDragLeave(e)}
          onDrop={(e) => handlerDrop(e)}
          tabIndex={0}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        >
          <input 
            ref={inputRef}
            name={name}
            type={'file'}
            accept={accept}
            multiple={multiple}
            hidden
            style={{visibility: 'hidden'}}
            onChange={(e) => handleImageUpload(e)}
          />

          <fieldset>
            <legend>
              <span>{label}</span>
            </legend>
          </fieldset>
        </div>

        {
          error && (
            <div className="textError">{errorText}</div>
          )
        }

      </div>
    </div>
  )
}