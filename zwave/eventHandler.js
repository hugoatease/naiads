const toContent = (data) => Buffer.from(JSON.stringify(data), 'utf8');

const handleNodeAdded = (channel, exchange, homeId, nodeId) => {
  channel.publish(exchange, '', toContent({
    homeId,
    event: 'NODE_ADDED',
    nodeId
  }));
}

const handleNodeRemoved = (channel, exchange, homeId, nodeId) => {
  channel.publish(exchange, '', toContent({
    homeId,
    event: 'NODE_REMOVED',
    nodeId
  }));
}

const handleNodeAvailable = (channel, exchange, homeId, nodeId, nodeInfo) => {
  channel.publish(exchange, '', toContent({
    homeId,
    event: 'NODE_AVAILABLE',
    nodeId,
    nodeInfo
  }));
}

const handleNodeReady = (channel, exchange, homeId, nodeId, nodeInfo) => {
  channel.publish(exchange, '', toContent({
    homeId,
    event: 'NODE_READY',
    nodeId,
    nodeInfo
  }));
}

const handleNodeEvent = (channel, exchange, homeId, nodeId, data) => {
  channel.publish(exchange, '', toContent({
    homeId,
    event: 'NODE_EVENT',
    nodeId,
    data
  }));
}

const handleValueAdded = (channel, exchange, homeId, nodeId, commandClass, valueId) => {
  channel.publish(exchange, '', toContent({
    homeId,
    event: 'VALUE_ADDED',
    nodeId,
    commandClass,
    valueId
  }));
}

const handleValueChanged = (channel, exchange, homeId, nodeId, commandClass, valueId) => {
  channel.publish(exchange, '', toContent({
    homeId,
    event: 'VALUE_CHANGED',
    nodeId,
    commandClass,
    valueId
  }));
}

const handleValueRefreshed = (channel, exchange, homeId, nodeId, commandClass, valueId) => {
  channel.publish(exchange, '', toContent({
    homeId,
    event: 'VALUE_REFRESHED',
    nodeId,
    commandClass,
    valueId
  }));
}

const handleValueRemoved = (channel, exchange, homeId, nodeId, commandClass, instance, index) => {
  channel.publish(exchange, '', toContent({
    homeId,
    event: 'VALUE_REMOVED',
    nodeId,
    commandClass,
    instance,
    index
  }));
}

const handleControllerCommand = (channel, exchange, homeId, nodeId, ctrlState, ctrlError, helpmsg) => {
  channel.publish(exchange, '', toContent({
    homeId,
    event: 'CONTROLLER_COMMAND',
    nodeId,
    ctrlState,
    ctrlError,
    helpmsg
  }));
}

module.exports = function (zwave, homeId, channel, exchange) {
  const wrapper = (cb) => (...args) => cb(channel, exchange, homeId, ...args);

  zwave.on('node added', wrapper(handleNodeAdded));
  zwave.on('node removed', wrapper(handleNodeRemoved));
  zwave.on('node available', wrapper(handleNodeAvailable));
  zwave.on('node ready', wrapper(handleNodeReady));
  zwave.on('node event', wrapper(handleNodeEvent));
  zwave.on('value added', wrapper(handleValueAdded));
  zwave.on('value changed', wrapper(handleValueChanged));
  zwave.on('value refreshed', wrapper(handleValueChanged));
  zwave.on('value removed', wrapper(handleValueRemoved));
  zwave.on('controller command', wrapper(handleControllerCommand));
}
