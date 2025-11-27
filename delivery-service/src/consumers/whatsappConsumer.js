const consume = require('../rabbit/consumerBase');
const db = require('../db/database');
const logger = require('../utils/logger');


consume('whatsapp_queue', async (msg) => {
db.saveMessage(msg);
logger("DELIVERED_WHATSAPP", msg);
console.log("WhatsApp sent to", msg.to);
})