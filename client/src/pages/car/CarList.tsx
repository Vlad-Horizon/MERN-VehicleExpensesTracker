import React, {useEffect, useState} from 'react'
import { CarCard, CarCardsContainer, DefaultButton } from '../../components'

import NoPhoto from '../../assets/img/no-photo-620x495.jpg'

import './carDetails.scss'
import { CAR_PAGE } from '../../routes/paths';

interface carsListParams {
  img: string,
  brend: string,
  model: string,
  year: string,
  price: string,
}

export default function CarList() {
  const [carsList, setCarsList] = useState<carsListParams[]>([
    {img: 'https://vag.ua/wp-content/uploads/2021/12/%D0%A4%D0%BE%D1%82%D0%BE-1.jpg', brend: 'Aydi', model: 'Q8', year: '2023', price: '120 000',},
    {img: 'https://cdn1.riastatic.com/photosnew/auto/photo/audi_a6__403149256f.jpg', brend: 'Aydi', model: 'A6', year: '2020', price: '90 500',},
    {img: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Audi_A8_D5_%282021%29_1X7A6342.jpg', brend: 'Aydi', model: 'A8', year: '2020', price: '100 000',},
    {img: 'https://cdn1.riastatic.com/photosnew/auto/photo/audi_a6__445736276f.jpg', brend: 'Porshe', model: 'Q7', year: '2019', price: '85 700',},
    {img: 'https://cdn.riastatic.com/photosnew/auto/photo/Audi_A6__279918561f.jpg', brend: 'Aydi', model: 'A6', year: '2022', price: '70 000',},
    {img: 'https://cf-cdn-v5.audi.at/media/Theme_Menu_Model_Dropdown_Item_Image_Component/root-ua-master-model-modelMenu-editableItems-19294-dropdown-352840-image/dh-500-a0e9a6/cbeecb27/1675150816/s7-dropdown.jpg', brend: 'Aydi', model: 'Q8', year: '2023', price: '120 000',},
    {img: 'https://www.aelita.ua/wp-content/uploads/2020/03/IMG_3392-1140x843.jpg', brend: 'Aydi', model: 'A8', year: '2018', price: '49 000',},
    {img: 'https://cdn.motor1.com/images/mgl/XB32Xe/s1/2023-audi-r8-v10-gt-rwd.webp', brend: 'Aydi', model: 'A8', year: '2022', price: '58 000',},
    {img: 'https://img.automoto.ua/overview/audi-r8-2023-252-thumb-2306.jpg', brend: 'Aydi', model: 'R8', year: '2020', price: '48 000',},
    {img: 'https://focus.ua/static/storage/thumbs/920x465/f/7f/87921568-1d3c26a056be0b55aa71dcbdc95d17ff.jpeg?v=7642_1', brend: 'Aydi', model: 'R8', year: '2023', price: '37 500',},
    {img: 'https://w.forfun.com/fetch/a9/a9b77c9d17fcd84d2a29e91fa6130c56.jpeg', brend: 'Aydi', model: 'A8', year: '2019', price: '100 000',},
    {img: 'https://focus.ua/static/storage/thumbs/1088x/c/4c/c8b6ddec-39ecb751f5def12e0148956a39d904cc.jpeg', brend: 'Aydi', model: 'A8', year: '2020', price: '115 000',},
    {img: 'https://cdn.riastatic.com/photosnew/auto/photo/Audi_A6__284112676f.jpg', brend: 'Aydi', model: 'A8', year: '2022', price: '98 000',},
    {img: 'https://cf-cdn-v5.audi.at/media/Theme_Menu_Model_Dropdown_Item_Image_Component/root-ua-master-model-modelMenu-editableItems-19604-dropdown-416769-image/dh-487-a0e9a6/0def2bbf/1680609464/rs-etron-gt-menu.jpg', brend: 'Aydi', model: 'Etron GT', year: '2023', price: '120 000',},
    {img: 'https://img.automoto.ua/overview/audi-a4-2023-040-huge-2295.jpg', brend: 'Aydi', model: 'A8', year: '2019', price: '57 000',},
  ]);
  
  return (
    <>
      <div className='contentPanel'>
        <DefaultButton 
          text='Add car'
          bg
          to={CAR_PAGE.add}
        />
      </div>

      <CarCardsContainer>
        {
          carsList.map((item, i) => {
            const {img, brend, model, year, price} = item;

            return (
              <CarCard 
                key={`${brend}${model}${year}${i}`}
                img={img}
                brend={brend}
                model={model}
                year={year}
                purchasePrice={price}
              />
            )
          })
        }
      </CarCardsContainer>
    </>
  )
}