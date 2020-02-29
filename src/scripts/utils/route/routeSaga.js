import qs from 'qs';
import { call, put, takeLatest } from 'redux-saga/effects';

import history from '../utils/history';

import {
  getInitialRouteDataStart,
  getInitialRouteDataSuccess,
  getInitialRouteDataFailure
} from '../reducers/route';


function* getInitialRouteData(action) {
  const route = {...history.location};
  try {
    yield put({ type: getInitialRouteDataSuccess.toString(), payload: route });
  } catch (e) {
    yield put({ type: getInitialRouteDataFailure.toString(), payload: e.message });
  }
}

function* routeSaga() {
  yield takeLatest(getInitialRouteDataStart.toString(), getInitialRouteData);
}

export default routeSaga;