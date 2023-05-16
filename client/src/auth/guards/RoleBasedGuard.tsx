import PropTypes from 'prop-types';
//
// import { useAuthContext } from '../useAuthContext';

// ----------------------------------------------------------------------

interface RoleBasedGuardProps {
  children: React.ReactNode,
  accessibleRoles: string,
}

const useCurrentRole = () => {
  // Logic here to get current user role
  const role = 'admin';
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }: RoleBasedGuardProps) {
  const currentRole = useCurrentRole();

  if (!accessibleRoles.includes(currentRole)) {
    return (
      <div>
        Role based guard
      </div>  
    );
  }

  return <>{children}</>;
}