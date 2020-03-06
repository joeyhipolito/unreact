import UA from 'ua-parser-js';
import { assign } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createSlice } from '@reduxjs/toolkit';

const uaSlice = createSlice({
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
} = uaSlice.actions;

function* getUa(action) {
  try {
    const ua = new UA().getResult();
    yield put({ type: getUserAgentData.toString(), payload: ua });
  } catch (e) {
    yield put({ type: getUserAgentDataFailure.toString(), payload: e.message });
  }
}

export function* uaSaga() {
  yield takeLatest(getUserAgentDataStart.toString(), getUa);
}

export default uaSlice.reducer;