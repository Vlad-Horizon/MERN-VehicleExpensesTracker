import React, {useState, useEffect} from 'react'
import ScrollHorizontal from '../scrollHorizontal/ScrollHorizontal';

import './lineButtons.scss'

interface compotentProps {
  searchKeyword: string,
  setSearchKeyword: Function
  list: object[],
}

export default function LineButtons({list, searchKeyword, setSearchKeyword}: compotentProps) {
  const [buttonsDOM, setButtonsDOM] = useState<any>();
  const [buttonsSizeWidth, setButtonsSizeWidth] = useState<number[]>([]);
  const [buttonId, setButtonId] = useState<number>(0);

  useEffect(() => {
    setButtonsDOM(document.querySelectorAll('.lineButton'));
  }, [])

  useEffect(() => {
    if (buttonsDOM) {
      const widths: number[] = [];
      
      buttonsDOM.forEach((button: Element) => {
        const { width } = button.getBoundingClientRect();
        widths.push(width);
      });

      setButtonsSizeWidth(widths);
    }
  }, [buttonsDOM])

  const buttons = () => {
    const table = list.map((item: any, i: number) => {
      const {title, sortName} = item;
      
      return (
        <div 
          key={i}
          className={`lineButton ${searchKeyword === sortName && 'lineButton_Active'}`} 
          onClick={() => {setSearchKeyword(sortName); setButtonId(i)}}
        >
          {title}
        </div>
      )
    })

    return table
  }

  const calcLeft = () => {
    let toLeft = 15;

    buttonsSizeWidth.forEach((item: number, i: number) => {
      if (i >= buttonId) return
      toLeft += (item + (15 * 2))
    })

    return toLeft
  }
  
  return (
    <ScrollHorizontal
      height='50px'
    >
      <div className='linuButtons'>
        {buttons()}
        <span 
          className='line' 
          style={{
            width: buttonsSizeWidth[buttonId], 
            left: calcLeft()
          }}
        ></span>
      </div>
    </ScrollHorizontal>
  )
}