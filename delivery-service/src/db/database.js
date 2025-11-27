const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Use DB_FILE from .env, fallback
const dbPath = process.env.DB_FILE || path.join(__dirname, 'delivery.db');

// Ensure the directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

db.run(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  messageId TEXT,
  channel TEXT,
  receiver TEXT,
  body TEXT,
  timestamp TEXT
)`);

exports.saveMessage = function(msg) {
  db.run(
    `INSERT INTO messages(messageId, channel, receiver, body, timestamp) VALUES(?,?,?,?,?)`,
    [msg.messageId, msg.channel, msg.to, msg.body, new Date().toISOString()]
  );
};
