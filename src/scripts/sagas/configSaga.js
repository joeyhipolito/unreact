import { call, put, takeLatest } from 'redux-saga/effects';

import * as config from '../../config.json';

import { getConfigStart, getConfigSuccess, getConfigFailure } from '../reducers/config';

function* getConfig(action) {
  try {
    yield put({ type: getConfigSuccess.toString(), payload: config.default });
  } catch (e) {
    yield put({ type: getConfigFailure.toString(), message: e.message });
  }
}

function* configSaga() {
  yield takeLatest(getConfigStart.toString(), getConfig);
}

export default configSaga;