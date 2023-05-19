import React from 'react';

import './buttonsHeader.scss';

interface ButtonsHeader {
  children: React.ReactNode;
}

export default function ButtonsHeader({ children }: ButtonsHeader) {
  return (
    <>
      <div className="ButtonsHeader">{children}</div>
    </>
  );
}
