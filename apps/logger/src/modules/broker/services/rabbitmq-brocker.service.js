'use strict';

const amqplib = require('amqplib');
const { amqpUrl } = require('../../../config');

class RabbitMQMessageBrokerService {
  constructor() {
    this.consume = this.consume.bind(this);
  }

  async consume(queue, callback) {
    try {
      const connection = await amqplib.connect(amqpUrl);
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, { durable: true });
      await channel.consume(queue, message => {
        const input = JSON.parse(message.content.toString());
        callback(input);
        channel.ack(message);
      });
    } catch (err) {
      console.error('Error while consuming message: ', err);
    }
  }
}

module.exports = RabbitMQMessageBrokerService;
