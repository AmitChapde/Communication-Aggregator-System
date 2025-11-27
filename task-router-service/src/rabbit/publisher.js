const amqp = require('amqplib');


const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

module.exports = async function (queue, message) {
  try {
   
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();

    await channel.assertQueue(queue);

   
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

    console.log(`Message sent to queue ${queue}`);
  } catch (err) {
    console.error('Failed to connect or send message to queue:', err);
    throw err;
  }
};
