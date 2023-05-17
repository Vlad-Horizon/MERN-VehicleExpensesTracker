import React from 'react';
import './carNumber.scss';

interface compotentProps {
  number: string | undefined;
}

export default function CarNumber({ number }: compotentProps) {
  if (!number) return <></>;

  const outputCarNumber = number.replace(/(?<=\D)(?=\d)|(?<=\d)(?=\D)/g, ' ');

  return (
    <>
      <div className="CarNumber">
        <div className="numberContainer">
          <div className="cauntry">
            <div className="flag">
              <div className="blue"></div>
              <div className="yelow"></div>
            </div>
            <div className="ua">
              <span>UA</span>
            </div>
          </div>
          <div className="field">
            <span>{outputCarNumber}</span>
          </div>
        </div>
      </div>
    </>
  );
}
