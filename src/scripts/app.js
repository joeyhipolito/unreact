import { forEach } from 'lodash';
import { compose } from '@reduxjs/toolkit';

import unreact from './lib/unreact';
import { injectReducer, injectSaga } from './utils/injectors';

import uaReducer, { uaSaga, getUserAgentDataStart } from './utils/ua';
import geoReducer, { geoSaga, getGeoDataRequest } from './utils/geo';
import routeReducer, { routeSaga, getInitialRouteDataStart } from './utils/route';
import configReducer, { configSaga, getConfigStart } from './utils/config';

export default @compose(
  injectReducer([
    { key: 'geo', reducer: geoReducer },
    { key: 'ua', reducer: uaReducer },
    { key: 'config', reducer: configReducer },
    { key: 'route', reducer: routeReducer }
  ]),
  injectSaga([
    { key: 'geo', saga: geoSaga },
    { key: 'ua', saga: uaSaga },
    { key: 'config', saga: configSaga },
    { key: 'route', saga: routeSaga },
  ])
)
class App extends unreact.Component {
// export default class App extends unreact.Component {
  constructor(props) {
    super(props);
    this._initializeState(props.store);
  }

  render() {
    return (
      <h1>Hello</h1>
    );
  }

  _initializeState(store) {
    const requiredReducers = [
      getConfigStart,
      getGeoDataRequest,
      getUserAgentDataStart,
      getInitialRouteDataStart
    ];

    forEach(requiredReducers, reducer => {
      store.dispatch({ type: reducer.toString() });
    });
  }
}