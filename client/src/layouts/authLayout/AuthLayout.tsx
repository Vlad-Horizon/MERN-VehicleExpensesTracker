import React from 'react';
import { Link, Outlet } from 'react-router-dom';

// scss
import './authLayout.scss';

export default function AuthLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
