import { assign } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as rawConfig from '../../config.json';

const configSlice = createSlice({
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
} = configSlice.actions;

function* getConfig(action) {
  try {
    yield put({ type: getConfigSuccess.toString(), payload: rawConfig.default });
  } catch (e) {
    yield put({ type: getConfigFailure.toString(), message: e.message });
  }
}

export function* configSaga() {
  yield takeLatest(getConfigStart.toString(), getConfig);
}

export default configSlice.reducer;