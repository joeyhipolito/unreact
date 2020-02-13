import { has, isArray, forEach } from 'lodash';

export default class Component {
  constructor(props = {}) {
    this.render = this.render || function () { };
    this.statechange = this.statechange || function () { };
    this.props = props;
    this.store = props.store || {};

    if (props.hasOwnProperty('element')) {
      this.element = props.element;
    }

    if (this.store) {
      this.store.subscribe( (state, key) => {
        this.statechange(state, key);
      });
    }

    if (props.hasOwnProperty('classNames')) {
      const classNames = isArray(props.classNames) ? props.classNames : [props.classNames];
      forEach(classNames, className => {
        this.element.classList.add(className);
      });
    }

    if (process.env.NODE_ENV === 'development') {
      module.hot && module.hot.accept(this, this.render);
    }
  }
}
