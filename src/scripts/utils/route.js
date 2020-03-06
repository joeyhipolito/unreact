import qs from 'qs';
import { assign } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

import history from './history';

const routeSlice = createSlice({
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
} = routeSlice.actions;

function* getInitialRouteData(action) {
  const route = {...history.location};
  try {
    yield put({ type: getInitialRouteDataSuccess.toString(), payload: route });
  } catch (e) {
    yield put({ type: getInitialRouteDataFailure.toString(), payload: e.message });
  }
}

export function* routeSaga() {
  yield takeLatest(getInitialRouteDataStart.toString(), getInitialRouteData);
}

export default routeSlice.reducer;