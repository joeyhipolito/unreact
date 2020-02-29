import Unreact from './lib/unreact';
import store from './lib/store';

import App from './app';

const Main = (
  <App store={store} />
);

Unreact.render(Main, document.getElementById('app'));