const amqp = require('amqplib');


module.exports = async function(queue, callback) {
const conn = await amqp.connect('amqp://localhost');
const channel = await conn.createChannel();
await channel.assertQueue(queue);


channel.consume(queue, async msg => {
const data = JSON.parse(msg.content.toString());
await callback(data);
channel.ack(msg);
});
};