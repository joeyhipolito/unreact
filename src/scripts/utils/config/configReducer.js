import { createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const config = createSlice({
  name: 'config',
  initialState: {
    noconfig: true,
    error: false
  },
  reducers: {
    getConfigStart: (state, action) => {},
    getConfigSuccess: (state, action) => {
      state = assign(state, action.payload);
    },
    getConfigFailure: (state, action) => {
      state.error = action.payload.error;
    }
  }
});

export const {
  getConfigStart,
  getConfigSuccess,
  getConfigFailure
} = config.actions;

export default config.reducer;