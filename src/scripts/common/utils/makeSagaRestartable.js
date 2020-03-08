// shameless copy https://github.com/redux-saga/redux-saga/issues/760
import { spawn, call, delay } from 'redux-saga/effects';

export const makeRestartable = (saga) => {
  return function* () {
    yield spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          console.error('unexpected root saga termination. The root sagas are supposed to be sagas that live during the whole app lifetime!',saga);
        } catch (e) {
          console.error('Saga error, the saga will be restarted',e);
        }
        yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
      }
    });
  };
};

export default makeRestartable;