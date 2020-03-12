export default function hoistStatics(targetComponent, sourceComponent) {

  if (typeof sourceComponent !== 'string') {
    targetComponent.prototype.statechange = sourceComponent.prototype.statechange;
    targetComponent.prototype.componentDidMount = sourceComponent.prototype.componentDidMount;
  }

  return targetComponent;
};