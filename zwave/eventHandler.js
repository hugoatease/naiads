const handleNodeAdded = (channel, exchange, nodeId) => {

}

const handleNodeRemoved = (channel, exchange, nodeId) => {

}

const handleNodeAvailable = (channel, exchange, nodeId, nodeInfo) => {

}

const handleNodeReady = (channel, exchange, nodeId, nodeInfo) => {

}

const handleNodeEvent = (channel, exchange, nodeId, data) => {

}

const handleValueAdded = (channel, exchange, nodeId, commandClass, valueId) => {

}

const handleValueChanged = (channel, exchange, nodeId, commandClass, valueId) => {

}

const handleValueRefreshed = (channel, exchange, nodeId, commandClass, valueId) => {

}

const handleValueRemoved = (channel, exchange, nodeId, commandClass, instance, index) => {

}

const handleControllerCommand = (nodeId, ctrlState, ctrlError, helpmsg) => {

}

module.exports = function (zwave, channel, exchange) {
  const wrapper = (cb) => (...args) => cb(channel, exchange, ...args);

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
