import { createSlice } from '@reduxjs/toolkit';
import {
  cloneDeep, omit,
  isArray,
  find, findIndex
} from 'lodash';

const form = createSlice({
  name: 'form',
  initialState: {
    autofilled: false,
    data: [],
  },
  reducers: {
    setFormData: (state, action) => {
      const key = action.payload[0];
      const value = action.payload[1];
      const dataIndex = findIndex(state, { key });
      if (dataIndex > -1) {
        state.data[dataIndex].value = value;
        state.data[dataIndex].synced = false;
      } else {
        state.data.push({ key, value, synced: false });
      }
    },
    removeFormData: (state, action) => {
      const dataIndex = findIndex(state.data, { key });
      state.data.splice(dataIndex, 1);
    },
    setFormDataSync: (state, action) => {
      const data = find(state.data, { key: action.payload });
      data.synced = true;
    }
  }
});

export const { setFormData, removeFormData, setFormDataSync } = form.actions;
export default form.reducer;