import React from 'react';
import MainErrorPage from './MainErrorPage';

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <MainErrorPage
      code="403"
      title="No permission"
      message="The page you’re trying access has restricted access. Please refer to your system administrator"
    />
  );
}
