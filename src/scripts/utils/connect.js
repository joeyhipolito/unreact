import { isArray, forEach } from 'lodash';
import Component from '../component';
import getInjectors from './reducerInjectors';

export default reducers => WrappedComponent => {

  reducers = isArray(reducers) ? reducers : [reducers];

  class InjectReducer extends Component {
    constructor(props) {
      super(props);
      forEach(reducers, ({ key, reducer }) => {
        getInjectors(props.store).injectReducer(key, reducer);
      });
    }

    render() {
      return new WrappedComponent(this.props).render();
    }
  }

  return InjectReducer;
};