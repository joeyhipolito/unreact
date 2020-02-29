import { createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';
// /:blockid/:itemGA

const route = createSlice({
  name: 'route',
  initialState: {},
  reducers: {
    getInitialRouteDataStart: (state, action) => {
    },
    getInitialRouteDataSuccess: (state, action) => {
      state = assign(state, action.payload);
    },
    getInitialRouteDataFailure: (state, action) => {
      state.error = action.payload;
    },
    setRouteData: (state, action) => {}
  }
});

export const {
  getInitialRouteDataStart,
  getInitialRouteDataSuccess,
  getInitialRouteDataFailure,
  setRouteData
} = route.actions;

export default route.reducer;