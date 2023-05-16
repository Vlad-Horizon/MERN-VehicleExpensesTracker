import React from 'react'

import './table.scss'

interface compotentProps {
  children: React.ReactNode,
}

export default function TableConatiner({children}: compotentProps) {
  return (

    <div className='tableBodyMainContainer'>
      <div className='tableBodyContainer'>
        <table>
          {children}
        </table>
      </div>
    </div>
  )
}