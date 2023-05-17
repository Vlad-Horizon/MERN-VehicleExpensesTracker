import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// hooks
import { useSelector } from 'react-redux';
// import { useAuthContext } from '../useAuthContext';

// components
import LoadingScreen from '../../components/loading/Loading';

// pages
import LoginPage from '../../pages/authPages/LoginPage';

// ----------------------------------------------------------------------

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useSelector((state: any) => state.user);
  // const { isAuthenticated, isInitialized } = useAuthContext();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (isLoading) {
    // !isInitialized
    return <LoadingScreen />;
  }

  if (!user || !Object.keys(user).length) {
    // !isAuthenticated
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <LoginPage />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
