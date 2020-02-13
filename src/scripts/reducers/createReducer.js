import { combineReducers } from '@reduxjs/toolkit';
import reducers from './index';

export default function  createReducer(injectedReducers = {}) {
 const rootReducer = combineReducers({
  reducers,
   ...injectedReducers,
 });

 return rootReducer;
}