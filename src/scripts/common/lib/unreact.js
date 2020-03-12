import * as snabbdom from 'snabbdom';
import propsModule from 'snabbdom/modules/props';
import eventlistenersModule from 'snabbdom/modules/eventlisteners';

const { h } = snabbdom;

const reconcile = snabbdom.init([propsModule, eventlistenersModule]);

let rootVNode;

const render = (el, rootDomElement) => {
  if (rootVNode == null) {
    rootVNode = rootDomElement;
  }
  rootVNode = reconcile(rootVNode, el);
};

const createElement = (type, props = {}, ...children) => {
  children = children.flat();
  if (type.prototype && type.prototype.isClassComponent) {
    const componentInstance = new type(props);
    componentInstance.__vNode = componentInstance.render();

    componentInstance.__vNode.data.hook = {
      create: () => {
        componentInstance.componentDidMount();
      }
    };

    return componentInstance.__vNode;
  }
  if (typeof (type) == 'function') {
    return type(props);
  }

  props = props || {};
  let dataProps = {};
  let eventProps = {};

  for(let propKey in props) {
    if (propKey.startsWith('on')) {
      const event = propKey.substring(2).toLowerCase();
      eventProps[event] = props[propKey];
    } else {
      dataProps[propKey] = props[propKey];
    }
  }

  return h(type, { props: dataProps, on: eventProps }, children);
};

export class Component {
  constructor(props) {
    this.props = props || {};
  }
  componentDidMount() { }
  render() {}
}

Component.prototype.isClassComponent = true;

const unreact = {
  createElement,
  render,
  Component
};

export default unreact;