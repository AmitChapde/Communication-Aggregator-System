const sqlite3 = require('sqlite3').verbose();


const db = new sqlite3.Database('./messages.db');


db.run(`CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY AUTOINCREMENT,
messageId TEXT,
channel TEXT,
receiver TEXT,
body TEXT,
timestamp TEXT
)`);


exports.saveMessage = function(msg) {
db.run(`INSERT INTO messages(messageId, channel, receiver, body, timestamp) VALUES(?,?,?,?,?)`,
[msg.messageId, msg.channel, msg.to, msg.body, new Date().toISOString()]
);
};