const express = require('express');
require('dotenv').config();

const app = express();


app.get('/health', (req, res) => res.send('OK'));

s
require('./src/consumers/emailConsumer');
require('./src/consumers/smsConsumer');
require('./src/consumers/whatsappConsumer');


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Delivery Service Running on port ${PORT}`);
});
