import React, {useState, useEffect} from 'react'
import {DefaultButton} from '..'
import './popup.scss'

interface compotentProps {
  children: React.ReactNode,
  submit: Function,
  close: Function,
  name: string,
  isSubmit?: boolean,
  valid?: boolean,
}

export default function Popup({children, name, submit, close, isSubmit, valid}: compotentProps) {
  
  return (
    <div className='popupContainer'>
      <div className='innerPopupContainer'>
        
        <div 
          className='clickContainer'
          onClick={() => close()}
        />

        <div className='popupContent'>
          <h2 className='popupLogo'>{name}</h2>

          <div className='inputs'>
            {children}
          </div>
          
          <div className='buttonContainer'>
            <DefaultButton 
              text='Convert'
              bg
              style={{marginRight: '10px'}}
              events={{
                onClick: () => submit()
              }}
            />

            <DefaultButton 
              text='Close'
              border
              events={{
                onClick: () => close()
              }}
            />
          </div>

          {/* {formError && (<div className='serverError'>form error</div>)} */}
          {(!valid && isSubmit) && (<div className='serverError'>Форма заповнена з помилками</div>)}
        </div>
      </div>
    </div>
  )
}