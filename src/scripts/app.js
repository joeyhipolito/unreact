import { forEach, invoke } from 'lodash';
import { compose } from '@reduxjs/toolkit';

import unreact from '~/common/lib/unreact';
import history from '~/common/utils/history';
import { injectReducer, injectSaga } from '~/common/utils/injectors';

import { LOAD_APP_REQUEST, LOAD_APP_SUCCESS } from './store.js';

import uaReducer, {
  uaSaga,
  GET_UA_REQUEST
} from '~/features/ua';

import geoReducer, {
  geoSaga,
  GET_GEO_REQUEST
} from '~/features/geo';

import routeReducer, {
  routeSaga,
  ROUTE_LISTENED,
  ROUTE_REQUESTED
} from '~/features/route';

import configReducer, {
  configSaga,
  GET_CONFIG_REQUEST
} from '~/features/config';

class App extends unreact.Component {
  constructor(props) {
    super(props);
    props.store.dispatch({ type: LOAD_APP_REQUEST });
    props.store.dispatch({ type: GET_UA_REQUEST });
    props.store.dispatch({ type: GET_GEO_REQUEST });
    props.store.dispatch({ type: GET_CONFIG_REQUEST });
    props.store.dispatch({
      type: ROUTE_REQUESTED,
      payload: history.location
    });
    props.store.dispatch({
      type: ROUTE_LISTENED,
      meta: { history }
    });
  }

  componentDidMount() {
    debugger;
    this.props.store.subscribe(this.statechange);
  }

  render() {
    this.props.store.dispatch({ type: LOAD_APP_SUCCESS });
    return (
      <h1>Hello</h1>
    );
  }

  statechange() {
    debugger;
  }
}

export default compose(
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
  ]),
)(App);