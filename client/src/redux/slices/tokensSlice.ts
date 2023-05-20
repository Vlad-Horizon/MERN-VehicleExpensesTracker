import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens(state, action) {
      state.tokens = action.payload;
    },

    setAccessToken(state, action) {
      state.tokens.accessToken = action.payload;
    }
  },
});

// ----------------------------------------------------------------------

export default tokensSlice.reducer;

// ----------------------------------------------------------------------

export function setTokens(accessToken: string, refreshToken: string) {
  return () => {
    dispatch(tokensSlice.actions.setTokens({
      accessToken: accessToken, 
      refreshToken: refreshToken,
    }));
  };
}

export function setAccessToken(accessToken: string) {
  return () => {
    dispatch(tokensSlice.actions.setAccessToken({
      accessToken: accessToken,
    }));
  };
}

export function removeTokens() {
  return () => {
    dispatch(tokensSlice.actions.setTokens(null));
  };
}

// ----------------------------------------------------------------------