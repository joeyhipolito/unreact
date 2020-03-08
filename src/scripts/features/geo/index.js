import axios from 'axios';
import { assign } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';

const geoSlice = createSlice({
  name: 'geo',
  initialState: {
    status: 'unset',
    loading: false,
    error: false
  },
  reducers: {
    getGeoDataRequest: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = false;
    },
    getGeoDataSuccess: (state, action) => {
      state = assign(state, action.payload, {
        status: 'success',
        loading: false,
        error: false
      });
    },
    getGeoDataFailure: (state, action) => {
      state.status = 'error';
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

export const GET_GEO_REQUEST = getGeoDataRequest.toString();
export const GET_GEO_SUCCESS = getGeoDataSuccess.toString();
export const GET_GEO_FAILURE = getGeoDataFailure.toString();

const fetchGeo = payload => axios.get('https://ipapi.co/json');

function* getGeo(action) {
  try {
    const geo = yield call(fetchGeo);
    yield put({ type: GET_GEO_SUCCESS, payload: geo.data });
  } catch (e) {
    console.log(e);
    yield put({ type: GET_GEO_FAILURE, message: e.message });
  }
}

export function* geoSaga() {
  yield takeLatest(GET_GEO_REQUEST, getGeo);
}

export default geoSlice.reducer;