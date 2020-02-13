import { createStore } from "redux";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { createInjectorsEnhancer } from './redux-injectors';
import createReducer from '../reducers/createReducer';

const sagaMiddleware = createSagaMiddleware();
const runSaga = sagaMiddleware.run;

export const store = configureStore({
  reducer: createReducer(),
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
  enhancers: [createInjectorsEnhancer({
    createReducer,
    runSaga,
  })]
});

export default store;

