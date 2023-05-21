import React from 'react';

// ----------------------------------------------------------------------

interface Form {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

export default function Form({ children }: Form) {
  return <>{children}</>;
}
