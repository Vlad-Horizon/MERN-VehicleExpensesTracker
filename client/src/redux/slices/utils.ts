import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'utils',
  initialState,
  reducers: {

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    setLoader(state, action) {
      state.isLoading = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setLoader
} = slice.actions;

// ----------------------------------------------------------------------

export function triggerLoader(isLoading: boolean) {
  dispatch(slice.actions.setLoader(isLoading));
}
