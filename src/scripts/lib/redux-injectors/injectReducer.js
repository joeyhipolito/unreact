import Component from '../component';
import getInjectors from './reducerInjectors';

export default ({ key, reducer }) => WrappedComponent => {
  class ReducerInjector extends Component {
    constructor(props) {
      super(props);
      getInjectors(props.store).injectReducer(key, reducer);
    }

    render() {
      return new WrappedComponent(this.props).render();
    }
  }

  return ReducerInjector;
};