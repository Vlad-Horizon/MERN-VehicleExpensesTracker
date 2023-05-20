import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import authService from '../../services/authService';
import { setSession } from '../../auth/utils';
import { removeTokens, setTokens } from './tokensSlice';
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    loginSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// ----------------------------------------------------------------------

export default userSlice.reducer;

// ----------------------------------------------------------------------

export function login(userName: string, password: string) {
  return async () => {
    // dispatch(userSlice.actions.startLoading());
    try {
      const res = await authService.login(userName, password);
      dispatch(setTokens(res.accessToken, res.refreshToken));
      setSession({ access: res.accessToken, refresh: res.refreshToken });

      const user = await authService.getCurrentUser();
      dispatch(userSlice.actions.loginSuccess(user));
    } catch (error) {
      dispatch(userSlice.actions.hasError(error));
    }
  };
}

export function logout() {
  return async () => {
    dispatch(userSlice.actions.startLoading());
    try {
      dispatch(removeTokens());
      dispatch(userSlice.actions.loginSuccess(null));
      delete axios.defaults.headers.common.Authorization;
    } catch (error) {
      dispatch(userSlice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
