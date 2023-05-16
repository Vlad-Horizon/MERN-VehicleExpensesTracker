import React from 'react'
import { DefaultButton } from '../../components'
import { CAR_PAGE } from '../../routes/paths'

import NoPhoto from '../../assets/img/no-photo-620x495.jpg'

import './carCard.scss'

interface compotentProps {
  img: string,
  brend: string,
  model: string,
  year: string,
  purchasePrice: string,
}

export default function CarCard({img, brend, model, year, purchasePrice}: compotentProps) {
  return (
    <div className='carCard'>
      <div className='carImage'>
        <img src={img ? img : NoPhoto} alt="" />
      </div>
      <div className='carInfo'>
        <div className='carName'>
          <span>{`${brend} ${model} ${year}`}</span>
        </div>
        <div className='purchasePrice'>Ціна: <span>{purchasePrice} $</span></div>
      </div>
      <div className='carButtons'>
        <DefaultButton 
          to={CAR_PAGE.details}
          text='View details'
        />
      </div>
    </div>
  )
}