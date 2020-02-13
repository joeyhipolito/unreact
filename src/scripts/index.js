import qs from 'qs';
import axios from 'axios';
import UA from 'ua-parser-js';
import { forEach } from 'lodash';
import { compose } from '@reduxjs/toolkit';

import { injectReducer } from './lib/redux-injectors' ;

import { getUnsyncedFormData } from './selectors';

import { setFormData, removeFormData, setFormDataSync } from './reducers/formReducer';
import { setUserAgentData } from './reducers/uaReducer';
import { setRouteData } from './reducers/routeReducer';
import { setGeoDataRequest } from './reducers/geoReducer';

import geoSaga from './sagas/geoSaga';
import geoReducer from './reducers/geoReducer';

import store from './lib/store';
import Component from './lib/component';


class App extends Component {
  constructor(props) {
    super(props);
    debugger;

    // const sagaMiddleware = createSagaMiddleware();
    // this.store = configureStore({
    //   reducer: rootReducer,
    //   middleware: [...getDefaultMiddleware(), sagaMiddleware]
    // });

    // sagaMiddleware.run(geoSaga);
    // this.store.dispatch({ type: setGeoDataRequest.toString() });

    // this.store.dispatch(setUserAgentData(new UA().getResult()));
    // this.store.dispatch(setRouteData(qs.parse(location.search, { ignoreQueryPrefix: true })));

  }

  render() {
    debugger;
    // console.log(this.store.getState());
    // this.store.dispatch(setFormData(['name', 'joey']));
    // this.store.dispatch(setFormData(['age', 26]));
    // console.log(this.store.getState());
    // this.store.dispatch(setFormDataSync('age'));
    // console.log(setFormData.toString());
    // console.log(this.store.getState());
    // console.log(getUnsyncedFormData(this.store.getState()));
  }
}

export const enhanced = compose(
  injectReducer({ key: 'geo', reducer: geoReducer })
)(App);

var app = new enhanced({ store });
app.render();
if (process.env.NODE_ENV === 'development') {
  module.hot && module.hot.accept(App, app.render);
}
