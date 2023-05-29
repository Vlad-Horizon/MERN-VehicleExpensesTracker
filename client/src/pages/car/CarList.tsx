import React, { useEffect, useState } from 'react';
import { ButtonsHeader, CarCard, CarCardsContainer, DefaultButton, PathToPage } from '../../components';

import './carList.scss';
import { CAR_PAGE } from '../../routes/paths';
import carApi from '../../services/carApi';
import { Helmet } from 'react-helmet';

interface carsListParams {
  id: string;
  image: string;
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
      <Helmet>
        <title>Car list</title>
      </Helmet>

      <div className="pageHeader">
        <PathToPage props={[['Car list', CAR_PAGE.list]]} />

        <ButtonsHeader>
          <DefaultButton text="Add car" bg to={CAR_PAGE.add} />
        </ButtonsHeader>
      </div>

      <CarCardsContainer>
        {carsList.map((item, i) => {
          const { id, image, brend, model, year, price } = item;

          return (
            <CarCard
              key={`${brend}${model}${year}${i}`}
              id={id}
              image={image}
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
