import React from 'react'

import './popupGalery.scss'

interface componentProps {
  src: string,
  id: number,
  onClick: Function,
  selectValue: number[],
  setSelectValue: Function,
}

export default function PopupImg({src, id, onClick, selectValue, setSelectValue}: componentProps) {  

  const chechSelect = () => {
    if (selectValue.some(item => item === id)) {
      setSelectValue(selectValue.filter((item) => item !== id));
      return;
    }
    onClick(id);
  }

  return (
    <div className='popupImg'>
      <div 
        className={`innerPopupImg ${selectValue.some(item => item === id) ? 'innerPopupImg_select' : ''}`}
        onClick={() => {
          chechSelect();
        }}
      >
        <img src={src} alt=""/>
      </div>
    </div>
  )
}