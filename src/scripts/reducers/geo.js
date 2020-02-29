import { createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const geo = createSlice({
  name: 'geo',
  initialState: {
    loading: false,
    error: false
  },
  reducers: {
    getGeoDataRequest: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    getGeoDataSuccess: (state, action) => {
      state = assign(state, action.payload, { loading: false, error: false });
    },
    getGeoDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  }
});

export const {
  getGeoDataRequest,
  getGeoDataSuccess,
  getGeoDataFailure
} = geo.actions;

export default geo.reducer;