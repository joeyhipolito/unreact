import Unreact from '../../lib/unreact';

import { isArray, forEach } from 'lodash';
import getInjectors from './reducerInjectors';

export default reducers => WrappedComponent => {

  reducers = isArray(reducers) ? reducers : [reducers];

  class InjectReducer extends Unreact.Component {
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

  return InjectReducer;
};