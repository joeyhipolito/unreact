import { forEach } from 'lodash';
import { compose } from '@reduxjs/toolkit';

import Unreact from './lib/unreact';
import { injectReducer, injectSaga } from './utils/injectors';

import geoReducer, { getGeoDataRequest } from './utils/geo';
import uaReducer, { getUserAgentDataStart } from './utils/ua';
import configReducer, { getConfigStart } from './utils/config';
import routeReducer, { getInitialRouteDataStart } from './utils/route';

import geoSaga from './sagas/geoSaga';
import uaSaga from './sagas/uaSaga';
import configSaga from './sagas/configSaga';
import routeSaga from './sagas/routeSaga';

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
class App extends Unreact.Component {
// export default class App extends Unreact.Component {
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
      getGeoDataRequest,
      getUserAgentDataStart,
      getConfigStart,
      getInitialRouteDataStart
    ];

    forEach(requiredReducers, reducer => {
      store.dispatch({ type: reducer.toString() });
    });
  }
}