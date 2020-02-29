import UA from 'ua-parser-js';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getUserAgentDataStart,
  getUserAgentData,
  getUserAgentDataFailure
} from '../reducers/ua';

const generateUa = payload => new UA().getResult();

function* getUa(action) {
  try {
    const ua = yield call(generateUa);
    yield put({ type: getUserAgentData.toString(), payload: ua });
  } catch (e) {
    yield put({ type: getUserAgentDataFailure.toString(), payload: e.message });
  }
}

function* uaSaga() {
  yield takeLatest(getUserAgentDataStart.toString(), getUa);
}

export default uaSaga;