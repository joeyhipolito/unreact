import { createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit';

import { createInjectorsEnhancer } from '~/common/utils/injectors';

export function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
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

