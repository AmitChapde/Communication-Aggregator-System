const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = process.env.DB_FILE || '/tmp/delivery.db';

// Ensure the directory exists (Render /tmp is already writable)
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open database:', err);
    process.exit(1); // stop service if DB cannot open
  }
});

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
