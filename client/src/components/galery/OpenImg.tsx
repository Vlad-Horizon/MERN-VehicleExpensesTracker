import React, {useState, useRef} from 'react'
import { ArrowLeft, ArrowRight } from '../../assets'

import './galery.scss'

interface compotentProps {
  src: string,
  set?: Function,
  value?: number,
  steps?: number,
}

export default function OpenImg({src, set, value, steps}: compotentProps) {

  const incrementPhoto = () => {
    if (!set || value === undefined || steps === undefined) return;
    if (value + 1 >= steps) return;
    set(value + 1);
  }

  const decrementPhoto = () => {
    if (!set || value === undefined) return;
    if (value - 1 < 0) return;
    set(value - 1)
  }

  const buttonsStyle = (side: 'left' | 'right') => {
    if (value === undefined || steps === undefined) {
      if (side === 'left') {
        return 'leftButtonDisable';
      }
      return 'rightButtonDisable';
    };

    if (side === 'left') {
      if (value - 1 < 0) return 'leftButtonDisable';
      return 'leftButton';
    }
    
    if (side === 'right') {
      if (value + 1 >= steps) return 'rightButtonDisable';
      return 'rightButton';
    }
  }

  return (
    <div className="openImg_Galery">
      <div className="imgContainer_Galery">
        <img src={src} alt="" /> 

        <div 
          className={`${buttonsStyle('left')}`} 
          onClick={() => decrementPhoto()}
        ><ArrowLeft /></div>

        <div 
          className={`${buttonsStyle('right')}`}  
          onClick={() => incrementPhoto()}
        ><ArrowRight /></div>
      </div>
    </div>
  )
}