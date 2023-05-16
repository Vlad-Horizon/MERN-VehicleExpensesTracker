// routes
import { PATH_AUTH } from '../routes/paths';

// utils
import axios from '../utils/axios';

// reduser
import {logout} from '../redux/slices/userSlice';

import authServices from '../services/authService'
import { dispatch } from '../redux/store';
import { setTokens } from '../redux/slices/tokensSlice';

// ----------------------------------------------------------------------

interface tokensProps {
  access: string | null
  refresh: string | null
}

interface tokenExpiredProps {
  accessExp: number,
  refreshExp: number,
}

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

const tokenExpired = ({accessExp, refreshExp}: tokenExpiredProps) => {
  const currentTime = Date.now();
  const accessTimeLeft = accessExp * 1000 - currentTime;
  const refreshTimeLeft = refreshExp * 1000 - currentTime;

  let expiredTimer;
  clearTimeout(expiredTimer);

  // expire accessToken
  if (refreshTimeLeft > accessTimeLeft) {
    expiredTimer = setTimeout(
      async () => {
        const res = await authServices.token(localStorage.getItem('refreshToken'))
        const { accessToken, refreshToken } = res;
        setSession({access: accessToken, refresh: refreshToken});
      }, accessTimeLeft
    )
    return
  }

  // expire refreshToken
  if (accessTimeLeft > refreshTimeLeft) {
    expiredTimer = setTimeout(
      () => {
        dispatch(logout());
      }, refreshTimeLeft
    )
    return
  }

  dispatch(logout());
};

// ----------------------------------------------------------------------

export const isValidToken = ({access, refresh}: tokensProps) => {
  const currentTime = Date.now() / 1000;
  let tokens = {
    accessStatys: false,
    refreshStatys: false,
  }

  if (access) {
    const accessDecoded = jwtDecode(access);
    tokens.accessStatys = accessDecoded.exp > currentTime;
  }

  if (refresh) {
    const refreshDecoded = jwtDecode(refresh);
    tokens.refreshStatys = refreshDecoded.exp > currentTime;
  }

  return tokens;
};

// ----------------------------------------------------------------------

export const setSession = ({access, refresh}: tokensProps) => {
  if (!access || !refresh) {
    dispatch(logout());
    return
  }

  dispatch(setTokens(access, refresh))

  axios.defaults.headers.common.Authorization = `Bearer ${access}`;

  const accessDecode = jwtDecode(access)
  const refreshDecode = jwtDecode(refresh)

  tokenExpired({accessExp: accessDecode.exp, refreshExp: refreshDecode.exp});
};