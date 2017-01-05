var amqp = require('amqplib');
var Channel = require('amqplib').Channel;
var OZW = require('openzwave-shared');
var commandHandler = require('./commandHandler');
var eventHandler = require('./eventHandler');

const zwave = new OZW();

amqp.connect('amqp://zwave:zwave@192.168.2.1/').then(connection => {
  connection.createChannel().then(channel => {
    channel.assertExchange('zwave-events', 'fanout', {durable: true}).then(info => {
      const { exchange } = info;
      eventHandler(zwave, channel, exchange);
    });

    zwave.on('driver ready', (homeId) => {
      channel.assertQueue(`zwave-${homeId}`, {durable: true}).then(info => {
        const { queue } = info;
        channel.consume(queue, commandHandler);
      });
    });
    zwave.connect('/dev/ttyAMA0');
  });
});
