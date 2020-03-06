import unreact from './lib/unreact';
import store from './store';

import App from './app';

const Main = (
  <App store={store} />
);

unreact.render(Main, document.getElementById('app'));