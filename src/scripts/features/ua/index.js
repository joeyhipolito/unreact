import UA from 'ua-parser-js';
import { assign } from 'lodash';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createSlice } from '@reduxjs/toolkit';

const uaSlice = createSlice({
  name: 'ua',
  initialState: {},
  reducers: {
    getUserAgentDataRequest: (state, action) => {
      state = assign(state, action.payload);
    },
    getUserAgentDataSuccess: (state, action) => {
      state = assign(state, action.payload);
    },
    getUserAgentDataFailure: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  getUserAgentDataRequest,
  getUserAgentDataSuccess,
  getUserAgentDataFailure
} = uaSlice.actions;

export const GET_UA_REQUEST = getUserAgentDataRequest.toString();
export const GET_UA_SUCCESS = getUserAgentDataSuccess.toString();
export const GET_UA_FAILURE = getUserAgentDataFailure.toString();

function* getUa(action) {
  try {
    const ua = new UA().getResult();
    yield put({ type: GET_UA_SUCCESS, payload: ua });
  } catch (e) {
    yield put({ type: GET_UA_FAILURE, payload: e.message });
  }
}

export function* uaSaga() {
  yield takeLatest(GET_UA_REQUEST, getUa);
}

export default uaSlice.reducer;