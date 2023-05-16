import React from 'react'

import './radioButton.scss'

type radioButtonProps = {
  sx?: {
    size?: number,
    margin?: string,
    padding?: string,
    color?: string,
    hover?: number,
  }
  events?: {},
  children: React.ReactNode,
  contextMenu?: boolean,
};

export default function RadioButton({children, sx, events, contextMenu}: radioButtonProps) {

  const setHover = () => {
    if (sx?.hover === 0) {
      return ''
    }
    return 'mainButton_Hover_Default'
  }

  const setContextStyle = () => {
    if (contextMenu) {
      return 'mainButton_ContextMenu'
    }
    return ''
  }

  return (
    <div 
      className={`mainButton ${setHover()} ${setContextStyle()}`}
      {...events}
      style={{
        width: sx?.size ? `${sx?.size}px` : `40px`,
        height: sx?.size ? `${sx?.size}px` : `40px`,
        margin: sx?.margin ? sx?.margin : '0',
        padding: sx?.padding ? sx?.padding : '8px',
        color: sx?.color ? sx?.color : 'rgb(99, 115, 129)',
      }}
    >{children}</div>
  )
} 