import React from 'react';
import MainErrorPage from './MainErrorPage';

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <MainErrorPage
      code="404"
      title="Sorry, page not found!"
      message="Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling."
    />
  );
}
