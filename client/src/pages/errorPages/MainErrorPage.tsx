import React from 'react';
import { DefaultButton } from '../../components';
import './mainErrorPage.scss';

// ----------------------------------------------------------------------

interface MainErrorPage {
  code: string;
  title: string;
  message: string;
}

// ----------------------------------------------------------------------

export default function MainErrorPage({ code, title, message }: MainErrorPage) {
  return (
    <div className="mainErrprPageComponent">
      <div className="errorContent">
        <h2>{title}</h2>
        <span>{message}</span>
        <div className="errorCode">
          <h2>{code}</h2>
        </div>

        <DefaultButton text="Go to home" to="/" bg />
      </div>
    </div>
  );
}
