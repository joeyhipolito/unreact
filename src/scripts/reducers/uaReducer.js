import { createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const ua = createSlice({
  name: 'ua',
  initialState: {},
  reducers: {
    setUserAgentData: (state, action) => {
      state = assign(state, action.payload);
    }
  }
});

export const { setUserAgentData } = ua.actions;
export default ua.reducer;