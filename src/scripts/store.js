import { createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  createSlice,
  configureStore,
  combineReducers,
  getDefaultMiddleware
} from '@reduxjs/toolkit';

import { createInjectorsEnhancer } from '~/common/utils/injectors';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle',
    loading: false,
    error: false
  },
  reducers: {
    loadAppRequest: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = false;
    },
    loadAppSuccess: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.status = 'loaded';
        state.error = false;
      }
    },
    loadAppFailure: (state, action) => {
      if (state.loading) {
        state.loading = false;
        state.status = 'crashed';
        state.error = action.payload;
      }
    },
  }
});

export const {
  loadAppRequest,
  loadAppSuccess,
  loadAppFailure
} = appSlice.actions;

export const LOAD_APP_REQUEST = loadAppRequest.toString();
export const LOAD_APP_SUCCESS = loadAppSuccess.toString();
export const LOAD_APP_FAILURE = loadAppFailure.toString();

const appReducer = appSlice.reducer;

export function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    app: appReducer,
    ...injectedReducers
  });

  return rootReducer;
}

const sagaMiddleware = createSagaMiddleware();
const runSaga = sagaMiddleware.run;

export const store = configureStore({
  reducer: createReducer(),
  middleware: [...getDefaultMiddleware({
    // should be true for devalopment, but I find it annoying
    serializableCheck: false
  }), sagaMiddleware],
  enhancers: [createInjectorsEnhancer({
    createReducer,
    runSaga,
  })]
});

export default store;

