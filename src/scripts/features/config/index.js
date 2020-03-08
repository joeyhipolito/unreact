import { assign } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as rawConfig from '~/../config.json';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    status: 'unset',
    error: false
  },
  reducers: {
    getConfigRequest: (state, action) => {
      state.status = 'loading';
      state.error = false;
    },
    getConfigSuccess: (state, action) => {
      state = assign(state, action.payload, { status: 'success', error: false });
    },
    getConfigFailure: (state, action) => {
      state.error = action.payload.error;
      state.status = 'error';
    }
  }
});

export const {
  getConfigRequest,
  getConfigSuccess,
  getConfigFailure
} = configSlice.actions;

export const GET_CONFIG_REQUEST = getConfigRequest.toString();
export const GET_CONFIG_SUCCESS = getConfigSuccess.toString();
export const GET_CONFIG_FAILURE = getConfigFailure.toString();

function* getConfig(action) {
  try {
    yield put({ type: GET_CONFIG_SUCCESS, payload: rawConfig.default });
  } catch (e) {
    yield put({ type: GET_CONFIG_FAILURE, message: e.message });
  }
}

export function* configSaga() {
  yield takeLatest(GET_CONFIG_REQUEST, getConfig);
}

export default configSlice.reducer;