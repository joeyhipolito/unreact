import hoistStatics from '~/common/utils/hoistStatics';
import unreact from '~/common/lib/unreact';

import { isArray, forEach } from 'lodash';
import getInjectors from './reducerInjectors';

export default reducers => WrappedComponent => {

  reducers = isArray(reducers) ? reducers : [reducers];

  class InjectReducer extends unreact.Component {
    constructor(props) {
      super(props);
      forEach(reducers, ({ key, reducer }) => {
        getInjectors(props.store).injectReducer(key, reducer);
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  // InjectReducer.prototype.statechange = WrappedComponent.prototype.statechange;
  // InjectReducer.prototype.componentDidMount = WrappedComponent.prototype.componentDidMount;
  // return InjectReducer;

  return hoistStatics(InjectReducer, WrappedComponent);
};