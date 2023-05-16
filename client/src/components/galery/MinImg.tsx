import React from 'react'

import './galery.scss'

interface compotentProps {
  id: number,
  src: string,
  set?: Function,
  value?: number,
}

export default function MinImg({src, id, set, value}: compotentProps) {
  const setImg = () => {
    if (id === value) return;
    if (!set) return;
    set(id);
  }

  return (
    <div className="minImg_Galery">
      <div 
        className={`innerMinImg ${value === id ? 'isSelectImg' : ''}`}
        onClick={() => setImg()}
      >
        <img src={src} alt="" /> 
      </div>
    </div>
  )
}