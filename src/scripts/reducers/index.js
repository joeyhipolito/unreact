import { combineReducers } from '@reduxjs/toolkit';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    ...injectedReducers
  });

  return rootReducer;
}