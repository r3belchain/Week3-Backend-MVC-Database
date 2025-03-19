const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Contact (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phoneNumber TEXT,
      company TEXT,
      email TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupName TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ContactGroups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contactId INTEGER,
      groupId INTEGER,
      FOREIGN KEY (contactId) REFERENCES Contact(id) ON DELETE CASCADE,
      FOREIGN KEY (groupId) REFERENCES Groups(id) ON DELETE CASCADE
    )
  `);
});

module.exports = db;
