const consume = require('../rabbit/consumerBase');
const db = require('../db/database');
const logger = require('../utils/logger');


consume('email_queue', async (msg) => {
db.saveMessage(msg);
logger("DELIVERED_EMAIL", msg);
console.log("Email sent to", msg.to);
});