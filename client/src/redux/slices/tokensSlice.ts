import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  tokens: null,
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    // getTokens(state) {
    //   if (state.tokens) {        
    //     return state.tokens
    //   }
    // },

    setTokens(state, action) {
      state.tokens = action.payload;
    },

    // setAccessToken(state, action) {
    //   if (state.tokens) {
    //     const newTokens = Object.assign({}, state.tokens, { access: action.payload });
    //     state.tokens = newTokens;
    //   }
    // },
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

export function removeTokens() {
  return () => {
    dispatch(tokensSlice.actions.setTokens(null));
  };
}

// ----------------------------------------------------------------------