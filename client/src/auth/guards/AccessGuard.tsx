import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useHelper from '../../hooks/useHelper';

// ----------------------------------------------------------------------

interface AccessGuardProps {
  children: React.ReactNode,
  claims: any[],
}

export default function AccessGuard({ children, claims }: AccessGuardProps) {
  const { hasUserAccess } = useHelper();

  return hasUserAccess(claims) ? <>{children}</> : <Navigate to="/403" replace />;
}
