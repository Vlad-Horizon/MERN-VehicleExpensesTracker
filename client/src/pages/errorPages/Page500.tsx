import React from 'react';
import MainErrorPage from './MainErrorPage';

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <MainErrorPage code="500" title="Internal Server Error" message="There was an error, please try again later." />
  );
}
