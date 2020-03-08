import qs from 'qs';
import { assign, isEqual, pick } from 'lodash';
import { createSlice, createSelector } from '@reduxjs/toolkit';
import { call, all, put, take, takeLatest, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import makeSagaRestartable from '~/common/utils/makeSagaRestartable';

export const getHash = state => state.hash;
export const getSearch = state => state.search;
export const getPathname = state => state.pathname;

export const getLocation = createSelector(
  [getHash, getSearch, getPathname],
  (hash, search, pathname) => ({ hash, search, pathname })
);

const routeSlice = createSlice({
  name: 'route',
  initialState: {
    status: 'unset'
  },
  reducers: {
    routeRequested: (state, action) => {
      state = assign(state, action.payload, { status: 'init' });
    },
    routeListened: (state, action) => {},
    routeChanged: (state, action) => {
      const prevState = getLocation(state);
      // sanity test (bec. it should only trigger on route change)
      if (!isEqual(prevState, action.payload)) {
        state = assign(state, action.payload, { status: 'changed' });
      }
    }
  }
});

export const {
  routeRequested,
  routeListened,
  routeChanged
} = routeSlice.actions;

export const ROUTE_REQUESTED = routeRequested.toString();
export const ROUTE_LISTENED  = routeListened.toString();
export const ROUTE_CHANGED = routeChanged.toString();

function* createHistoryChannel(history) {
  return eventChannel(emit => {
    const changeHandler = location => {
      emit(pick(location, ['pathname', 'hash', 'search']));
    };

    const unlisten = history.listen(changeHandler);
    return () => unlisten();
  });
}

function* setRouteChanged(action) {

  const historyChannel = yield call(createHistoryChannel, action.meta.history);
  while(true) {
    try {
      const payload = yield take(historyChannel);
      yield put({ type: ROUTE_CHANGED, payload });
    } catch (e) {
      console.error(e);
    }
  }

}

function* routeChangeListenerSaga() {
  yield takeLatest(ROUTE_LISTENED, setRouteChanged);
}

const sagas = [
  routeChangeListenerSaga
].map(makeSagaRestartable);

export function* routeSaga() {
  yield all(sagas.map(saga => call(saga)));
}

export default routeSlice.reducer;