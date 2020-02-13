import { combineReducers } from '@reduxjs/toolkit';
import ua from './uaReducer';
import geo from './geoReducer';
import form from './formReducer';
import route from './routeReducer';

export default combineReducers({
  ua,
  geo,
  form,
  route
});