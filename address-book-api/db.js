const sqlite = require("sqlite");
const sqlite3 = require("sqlite3").verbose();

// Fungsi koneksi ke database async function connectDB
async function connectDB() {
  return sqlite.open({
    filename: "./address-book-api.db",
    driver: sqlite3.Database,
  });
}

async function initDB() {
  const db = await connectDB();
  console.log("Membuat tabel Contact...");
  await db.exec(`
   CREATE TABLE IF NOT EXISTS Contact (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phoneNumber TEXT,
      company TEXT,
      email TEXT
    );
  `);
  console.log("Tabel Contact selesai.");
  await db.exec(`
     CREATE TABLE IF NOT EXISTS Groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupName TEXT
    )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS ContactGroups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contactId INTEGER,
      groupId INTEGER,
      FOREIGN KEY (contactId) REFERENCES Contact(id) ON DELETE CASCADE,
      FOREIGN KEY (groupId) REFERENCES Groups(id) ON DELETE CASCADE
    )`);
  await db.close();
  console.log("Database telah diinisialisasi!");
}

// (async () => {
//   await initDB();
// })();

module.exports = connectDB;
