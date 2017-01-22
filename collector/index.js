const config = require('config');
const amqp = require('amqplib');
const Influx = require('influx');

const influx = new Influx.InfluxDB({
  host: config.get('influx.host'),
  port: config.get('influx.port'),
  database: config.get('influx.db')
});

const valueChanged = (data, ack) => {
  const { homeId, nodeId, date } = data;
  const { label, value, units, genre } = data.valueId;
  console.log(homeId, nodeId, date, label, value, units, genre);
  if (genre === 'user') {
    influx.writeMeasurement(`${label.toLowerCase().replace(' ', '-')}`, [{
      tags: { homeId, nodeId },
      fields: { value },
      timestamp: date * Math.pow(10, 6)
    }]).then(() => ack());
  } else {
    ack();
  }
}

const eventMappings = {
  VALUE_CHANGED: valueChanged
}

const eventHandler = (channel) => (message) => {
  const ack = () => channel.ack(message);
  const content = JSON.parse(message.content);
  if (eventMappings[content.event]) {
    eventMappings[content.event](content, ack);
  } else {
    ack();
  }
}

amqp.connect(config.get('amqp.uri')).then(connection => {
  connection.createChannel().then(channel => {
    channel.assertQueue('naiads-collector').then(() => {
      channel.bindQueue('naiads-collector', 'zwave-events', '').then(() => {
        channel.consume('naiads-collector', eventHandler(channel));
      })
    });
  });
});
