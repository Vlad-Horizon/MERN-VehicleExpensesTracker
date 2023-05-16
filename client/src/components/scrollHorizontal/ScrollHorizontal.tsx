import React, {useState, useEffect, useRef} from 'react'

import './scrollHorizontal.scss'

interface componentProps {
  children: React.ReactNode,
  height?: string,
  marginTop?: string,
}

export default function ScrollHorizontal({children, height, marginTop}: componentProps) {
  const scrollHorizontal = useRef<HTMLDivElement>(null);
  const [scrollParams, setScrollParams] = useState({
    isScroling: false,
    clientX: 0,
    scrollX: 0,
  });

  // useEffect(() => {
  //   // Переключення скролу з y на x
  //   const el = horizontalScroll.current;

  //   if (el) {
  //     const onWheel = (e: any) => {
  //       e.preventDefault();
  //       el.scrollTo({
  //         left: el.scrollLeft + e.deltaY * 4,
  //         behavior: 'smooth', //auto
  //       });
  //     }

  //     el.addEventListener('wheel', onWheel);

  //     return () => el.removeEventListener('wheel', onWheel);
  //   }
  // }, [])

  useEffect(() => {
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    }
  }, [])


  const onMouseMove = (e: any) => {
    
    // if (scrollHorizontal && scrollHorizontal.current && !scrollHorizontal.current.contains(e.target)) return;
    // if (!scrollHorizontal.current) return;
    // e.preventDefault();
    
    // const {clientX, scrollX, isScroling} = scrollParams;
    
    // if (isScroling) {
    //   const scrollXCalc = scrollX + e.clientX - clientX;
    //   scrollHorizontal.current.scrollLeft = scrollXCalc;

    //   setScrollParams({
    //     ...scrollParams, 
    //     scrollX: scrollXCalc,
    //     clientX: e.clientX,
    //   });
    // }
  }
  
  const onMouseUp = (e: any) => {
    // if (scrollHorizontal && scrollHorizontal.current && !scrollHorizontal.current.contains(e.target)) return;
    // e.preventDefault();
    // setScrollParams({...scrollParams, isScroling: false});
  }
  
  const onMouseDown = (e: any) => {    
    // if (scrollHorizontal && scrollHorizontal.current && !scrollHorizontal.current.contains(e.target)) return;
    // e.preventDefault();
    // setScrollParams({...scrollParams, isScroling: true, clientX: e.clientX});
  }

  return (
    <div 
      className='scrollHorizontel'
      style={{
        height: height,
        marginTop: marginTop,
      }}
      ref={scrollHorizontal} 
      onMouseDown={(e) => onMouseDown(e)}
      onMouseUp={(e) => onMouseUp(e)}
      onMouseMove={(e) => onMouseMove(e)}
    >
      <div className='innerScrollHorizontel'>
        {children}
      </div>
    </div>
  )
}