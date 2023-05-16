import React from 'react'

import './carCard.scss'

interface compotentProps {
  children: React.ReactNode,
}

export default function CarCardsContainer({children}: compotentProps) {
  return (
    <div className='carCardsContainer'>
      {children}
    </div>
  )
}