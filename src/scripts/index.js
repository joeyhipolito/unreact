import unreact from '~/common/lib/unreact';
import history from '~/common/utils/history';
import store from './store';

import App from './app';

unreact.render(<App store={store} history={history}/>, document.getElementById('app'));