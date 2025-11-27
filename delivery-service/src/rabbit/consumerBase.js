const amqp = require('amqplib');
require('dotenv').config();

let conn;

async function getConnection() {
  if (!conn) {
    conn = await amqp.connect(process.env.RABBIT_URL);
  }
  return conn;
}

module.exports = async function(queue, callback) {
  try {
    const connection = await getConnection();
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);

    channel.consume(queue, async (msg) => {
      try {
        const data = JSON.parse(msg.content.toString());
        await callback(data);
        channel.ack(msg);
      } catch (err) {
        console.error("Error processing message:", err);
        channel.nack(msg, false, false);
      }
    });

  } catch (err) {
    console.error("Failed to connect or setup queue:", err);
  }
};
