import React from 'react';
import { DefaultButton } from '../../components';
import { CAR_PAGE } from '../../routes/paths';

import NoPhoto from '../../assets/img/no-photo-620x495.jpg';

import './carCard.scss';
import { base64DecodeFile } from '../../utils/base64DecodeFile';
import { createUrlToFile } from '../../utils/createUrlToFile';

interface compotentProps {
  id: string;
  image: string;
  brend: string;
  model: string;
  year: string;
  purchasePrice: string;
}

export default function CarCard({ id, image, brend, model, year, purchasePrice }: compotentProps) {
  const imageDecodeFile = base64DecodeFile(image);
  const imageUrl = createUrlToFile(imageDecodeFile);

  return (
    <div className="carCard">
      <div className="carImage">
        <img src={imageUrl ? imageUrl : NoPhoto} alt="" />
      </div>
      <div className="carInfo">
        <div className="carName">
          <span>{`${brend} ${model} ${year}`}</span>
        </div>
        <div className="purchasePrice">
          Ціна: <span>{purchasePrice} $</span>
        </div>
      </div>
      <div className="carButtons">
        <DefaultButton to={`${CAR_PAGE.details}/${id}`} text="View details" />
      </div>
    </div>
  );
}
