import { createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const route = createSlice({
  name: 'route',
  initialState: {},
  reducers: {
    setRouteData: (state, action) => {
      state = assign(state, action.payload);
    }
  }
});

export const { setRouteData } = route.actions;
export default route.reducer;