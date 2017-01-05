import amqp, { Channel } from 'amqplib';
import OZW from 'openzwave-shared';
import commandHandler from './commandHandler';
import eventHandler from './eventHandler';

const zwave = new OZW();

amqp.connect('amqp://zwave:zwave@192.168.2.1/').then(connection => {
  connection.createChannel().then(channel => {
    channel.assertExchange('zwave-events', 'fanout', {durable: true}).then(info => {
      const { exchange } = info;
      eventHandler(channel, exchange);
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
