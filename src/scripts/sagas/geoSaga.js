import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { setGeoDataRequest, setGeoData, setGeoDataFailed } from '../reducers/geoReducer';

const fetchGeo = payload => axios.get('https://ipapi.co/json');

function* getGeo(action) {
  try {
    const geo = yield call(fetchGeo);
    yield put({ type: setGeoData.toString(), payload: geo.data });
  } catch (e) {
    yield put({ type: setGeoDataFailed.toString(), message: e.message });
  }
}

function* geoSaga() {
  yield takeLatest(setGeoDataRequest.toString(), getGeo);
}

export default geoSaga;