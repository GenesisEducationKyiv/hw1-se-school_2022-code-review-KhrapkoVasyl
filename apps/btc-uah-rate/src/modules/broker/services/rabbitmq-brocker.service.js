'use strict';

const amqplib = require('amqplib');
const { amqpUrl } = require('../../../config');

class RabbitMQMessageBrokerService {
  constructor() {
    this.publishUsingDefaultExchange =
      this.publishUsingDefaultExchange.bind(this);
  }

  async publishUsingDefaultExchange(queue, message) {
    const connection = await amqplib.connect(amqpUrl);
    const channel = await connection.createChannel();
    try {
      await channel.assertQueue(queue, { durable: true });
      await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (err) {
      console.error(
        'Error in publishing message using default exchange: ',
        err
      );
    } finally {
      await channel.close();
      await connection.close();
    }
  }
}

module.exports = RabbitMQMessageBrokerService;
