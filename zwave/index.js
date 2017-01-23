var config = require('config');
var amqp = require('amqplib');
var Channel = require('amqplib').Channel;
var OZW = require('openzwave-shared');
var commandHandler = require('./commandHandler');
var eventHandler = require('./eventHandler');

const zwave = new OZW({
  UserPath: '/home/pi/naiads/zwave/config'
});

amqp.connect(config.get('amqp.uri')).then(connection => {
  connection.createChannel().then(channel => {
    zwave.on('driver ready', (homeId) => {
      channel.assertExchange('zwave-events', 'fanout', {durable: true}).then(info => {
        const { exchange } = info;
        eventHandler(zwave, homeId, channel, exchange);
      });
      channel.assertQueue(`zwave-${homeId}`, {durable: true}).then(queueInfo => {
        const { queue } = queueInfo;
        channel.assertExchange('zwave-commands', 'direct').then(exchangeInfo => {
          const { exchange } = exchangeInfo;
          channel.bindQueue(queue, exchange, `${homeId}`).then(() => {
            channel.consume(queue, commandHandler(channel, zwave));
          });
        });
      });
    });
    zwave.connect(config.get('zwave.device'));
  });
});

process.on('SIGINT', () => {
  zwave.writeConfig();
  zwave.disconnect(config.get('zwave.device'));
  process.exit();
})
