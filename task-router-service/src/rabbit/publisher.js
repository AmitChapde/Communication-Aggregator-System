const amqp = require('amqplib');


module.exports = async function(queue, message) {
const conn = await amqp.connect('amqp://localhost');
const channel = await conn.createChannel();
await channel.assertQueue(queue);


channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
};