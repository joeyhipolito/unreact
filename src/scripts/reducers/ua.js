import { createSlice } from '@reduxjs/toolkit';
import { assign } from 'lodash';

const ua = createSlice({
  name: 'ua',
  initialState: {},
  reducers: {
    getUserAgentDataStart: (state, action) => {
      state = assign(state, action.payload);
    },
    getUserAgentData: (state, action) => {
      state = assign(state, action.payload);
    },
    getUserAgentDataFailure: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  getUserAgentDataStart,
  getUserAgentData,
  getUserAgentDataFailure
} = ua.actions;

export default ua.reducer;