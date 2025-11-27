const fs = require('fs');


exports.saveLog = (req, res) => {
const log = req.body;


fs.appendFileSync('./logs.txt', JSON.stringify(log) + "\n");


res.json({ status: "logged" });
};