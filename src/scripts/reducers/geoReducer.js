import { createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const geo = createSlice({
  name: 'geo',
  initialState: {
    loading: false,
    error: false
  },
  reducers: {
    setGeoDataRequest: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    setGeoData: (state, action) => {
      state = assign(state, action.payload, { loading: false, error: false });
    },
    setGeoDataFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  }
});

export const { setGeoDataRequest, setGeoData, setGeoDataFailed } = geo.actions;
export default geo.reducer;