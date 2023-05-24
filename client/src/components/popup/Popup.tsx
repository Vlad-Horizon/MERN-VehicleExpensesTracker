import React, { useState, useEffect } from 'react';
import { DefaultButton } from '..';
import './popup.scss';

interface compotentProps {
  children: React.ReactNode;
  close: Function;
  popupLogo: string;
}

export default function Popup({ children, popupLogo, close }: compotentProps) {
  return (
    <div className="popupContainer">
      <div className="innerPopupContainer">
        <div className="clickContainer" onClick={() => close()} />

        <div className="popupContent">
          <h2 className="popupLogo">{popupLogo}</h2>

          {children}
        </div>
      </div>
    </div>
  );
}
