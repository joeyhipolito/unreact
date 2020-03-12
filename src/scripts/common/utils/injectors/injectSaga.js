import hoistStatics from '~/common/utils/hoistStatics';
import unreact from '~/common/lib/unreact';

import { isArray, forEach } from 'lodash';
import getInjectors from './sagaInjectors';

export default sagas => WrappedComponent => {

  sagas = isArray(sagas) ? sagas : [sagas];

  class InjectSaga extends unreact.Component {
    constructor(props) {
      super(props);
      forEach(sagas, ({ key, saga, mode }) => {
        getInjectors(props.store).injectSaga(key, { saga, mode });
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  // InjectSaga.prototype.statechange = WrappedComponent.prototype.statechange;
  // InjectSaga.prototype.componentDidMount = WrappedComponent.prototype.componentDidMount;
  // return InjectSaga;
  return hoistStatics(InjectSaga, WrappedComponent);
};