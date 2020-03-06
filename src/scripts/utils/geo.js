import axios from 'axios';
import { assign } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

const geoSlice = createSlice({
  name: 'geo',
  initialState: {
    loading: false,
    error: false
  },
  reducers: {
    getGeoDataRequest: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    getGeoDataSuccess: (state, action) => {
      state = assign(state, action.payload, { loading: false, error: false });
    },
    getGeoDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    }
  }
});

export const {
  getGeoDataRequest,
  getGeoDataSuccess,
  getGeoDataFailure
} = geoSlice.actions;

const fetchGeo = payload => axios.get('https://ipapi.co/json');

function* getGeo(action) {
  try {
    const geo = yield call(fetchGeo);
    yield put({ type: getGeoDataSuccess.toString(), payload: geo.data });
  } catch (e) {
    console.log(e);
    yield put({ type: getGeoDataFailure.toString(), message: e.message });
  }
}

export function* geoSaga() {
  yield takeLatest(getGeoDataRequest.toString(), getGeo);
}

export default geoSlice.reducer;