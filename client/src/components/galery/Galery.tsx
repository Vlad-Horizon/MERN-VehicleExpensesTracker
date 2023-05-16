import React, {useState} from 'react'
import { ScrollHorizontel } from '..';
import OpenImg from './OpenImg'
import MinImg from './MinImg'

import './galery.scss'

interface componentProps {
  src: string[] | null,
  defaultImg: string,
}

export default function Galery({src, defaultImg}: componentProps) {
  const [positionGalery, setPositionGalery] = useState<number>(0);
  
  if (!src || src.length === 0) {
    return (
      <div className='galery'>
        <OpenImg src={defaultImg}/>
      </div>
    )
  }
  
  if (Array.isArray(src)) {
    return (
      <div className='galery'>
        <OpenImg 
          src={src[positionGalery]}
          set={setPositionGalery}
          value={positionGalery}
          steps={src.length}
        />

        <ScrollHorizontel
          // height='60px'
        >
          {
            src.map((item, i) => (
              <MinImg 
                key={i} 
                id={i}
                src={src[i]}
                set={setPositionGalery}
                value={positionGalery}
              />
            ))
          }
        </ScrollHorizontel>
      </div>
    )
  }

  return (
    <div className='imgContainer_ImgContainer'></div>
  )
}