import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { getGeoDataRequest, getGeoDataSuccess, getGeoDataFailure } from '../reducers/geo';

const fetchGeo = payload => axios.get('https://ipapi.co/json');

function* getGeo(action) {
  try {
    const geo = yield call(fetchGeo);
    yield put({ type: getGeoDataSuccess.toString(), payload: geo.data });
  } catch (e) {
    yield put({ type: getGeoDataFailure.toString(), message: e.message });
  }
}

function* geoSaga() {
  yield takeLatest(getGeoDataRequest.toString(), getGeo);
}

export default geoSaga;