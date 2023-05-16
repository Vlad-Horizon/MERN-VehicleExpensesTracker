import { Navigate } from 'react-router-dom';

// hooks
import { useSelector } from 'react-redux';
// import { useAuthContext } from '../useAuthContext';

// routes
import { CAR_PAGE, DRIVE_PAGE } from '../../routes/paths';
import { Loading } from '../../components';

// components

// ----------------------------------------------------------------------

interface GuestGuardProps {
  children: React.ReactNode,
}

export default function GuestGuard({ children }: GuestGuardProps) {
  // const { isAuthenticated, isInitialized } = useAuthContext();
  const { user, isLoading } = useSelector((state: any) => state.user )

  if (isLoading) { // !isInitialized
    return <Loading />;
  }

  if (user) { // isAuthenticated
    return <Navigate to={CAR_PAGE.list} />;
  }

  return <>{children}</>;
}
