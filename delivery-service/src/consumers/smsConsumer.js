const consume = require('../rabbit/consumerBase');
db = require('../db/database');
const logger = require('../utils/logger');


consume('sms_queue', async (msg) => {
db.saveMessage(msg);
logger("DELIVERED_SMS", msg);
console.log("SMS sent to", msg.to);
});