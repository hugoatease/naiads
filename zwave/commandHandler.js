function addNode(zwave, content, ack) {
  const doSecurity = content.secure ? content.secure : false;
  zwave.addNode({ doSecurity });
  ack();
}

function removeNode(zwave, content, ack) {
  zwave.removeNode();
  ack();
}

const eventMappings = {
  ADD_NODE: addNode,
  REMOVE_NODE: removeNode
}

module.exports = (channel, zwave) => (message) => {
  const ack = () => channel.ack(message);
  const content = JSON.parse(message.content);
  if (content.event && eventMappings[content.event]) {
    eventMappings[content.event](zwave, content, ack);
  } else {
    ack();
  }
}
