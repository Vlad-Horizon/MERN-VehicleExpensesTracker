import React, { useEffect, useCallback } from 'react';

// utils
import { setSession, isValidToken } from './utils';

// axios
import axios from '../utils/axios';

// reduser
import { logout } from '../redux/slices/userSlice';

// services
import authServices from '../services/authService';
import { dispatch, store } from '../redux/store';
// import { getTokens } from '../redux/slices/tokensSlice';

// ----------------------------------------------------------------------

interface AuthProps {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

function AuthContainer({ children }: AuthProps) {
  const initialize = useCallback(async () => {
    try {
      const { tokens } = store.getState();
      const { accessToken, refreshToken } = tokens.tokens;

      if (!accessToken || !refreshToken) {
        dispatch(logout());
        return;
      }

      const { accessStatys, refreshStatys } = isValidToken({
        access: accessToken,
        refresh: refreshToken,
      });

      if (!accessStatys && refreshStatys) {
        const res = await authServices.token(refreshToken);
        setSession({
          access: res.accessToken,
          refresh: res.refreshToken,
        });
        return;
      }

      if (accessStatys) {
        setSession({
          access: accessToken,
          refresh: refreshToken,
        });
        return;
      }

      dispatch(logout());
    } catch (e) {
      dispatch(logout());
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}

// ----------------------------------------------------------------------

export default AuthContainer;
