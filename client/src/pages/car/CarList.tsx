import React, { useEffect, useState } from 'react';
import { CarCard, CarCardsContainer, DefaultButton } from '../../components';

import NoPhoto from '../../assets/img/no-photo-620x495.jpg';

import './carDetails.scss';
import { CAR_PAGE } from '../../routes/paths';
import carApi from '../../services/driveApi';

interface carsListParams {
  id: string;
  img: string;
  brend: string;
  model: string;
  year: string;
  price: string;
}

export default function CarList() {
  const [carsList, setCarsList] = useState<carsListParams[]>([]);

  useEffect(() => {
    getAllCars();
  }, []);

  const getAllCars = async () => {
    const cars = await carApi.getAllCars();
    setCarsList(cars);
  };

  return (
    <>
      <div className="contentPanel">
        <DefaultButton text="Add car" bg to={CAR_PAGE.add} />
      </div>

      <CarCardsContainer>
        {carsList.map((item, i) => {
          const { id, img, brend, model, year, price } = item;

          return (
            <CarCard
              key={`${brend}${model}${year}${i}`}
              id={id}
              img={img}
              brend={brend}
              model={model}
              year={year}
              purchasePrice={price}
            />
          );
        })}
      </CarCardsContainer>
    </>
  );
}
