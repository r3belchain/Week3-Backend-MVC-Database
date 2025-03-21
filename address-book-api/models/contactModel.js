let connectDB = require("../db");
class Contact {
  constructor(id, name, phoneNumber, company, email) {
    this.id = id,
    this.name = name,
    this.phoneNumber = phoneNumber,
    this.company = company,
    this.email = email
  }

  static async create(name, phoneNumber, company, email) {
    const db = await connectDB();
    try {
      const result = await db.run(
        `INSERT INTO Contact (name, phoneNumber, company, email) VALUES (?, ?, ?, ?)`,
        [
          name,
          phoneNumber,
         company,
          email,
        ]
      );
       const newContact = await db.get(`SELECT * FROM Contact WHERE id = ?`, [
         result.lastID,
       ]);
    return new Contact(
      newContact.id,
      newContact.name,
      newContact.phoneNumber,
      newContact.company,
      newContact.email
    );
    } catch (err) {
      throw err;
    } finally {
      if (db) {
        await db.close();
      }
    }
  }

  static async showContact() {
    const db = await connectDB();
    try {
      const showAll = await db.all(`SELECT * FROM Contact`);
      const contacts = showAll.map(
        (row) => new Contact(row.id, row.name, row.phoneNumber, row.company, row.email)
      );
      return contacts;
    } catch (err) {
      throw err;
    } finally {
      if (db) {
        await db.close();
      }
    }
  }

  static async update(id, name, phoneNumber, company, email) {
    const db = await connectDB();
    try {
      const result = await db.run(
        `UPDATE Contact SET name = ?, phoneNumber = ?, company = ?, email = ? WHERE id = ?`,
        [name, phoneNumber, company, email, id]
      );

      if (result.changes === 0) {
        return null; // 
      }
      const updatedContact = await db.get(
        `SELECT * FROM Contact WHERE id = ?`,
        [id]
      );

      return updatedContact;
    } catch (err) {
      throw err;
    } finally {
      await db.close();
    }
  }

  static async delete(id) {
    const db = await connectDB();
    try {
      const result = await db.run(`DELETE FROM Contact WHERE id = ?`, [id]);
      if (result.changes === undefined || result.changes === 0) {
        return false; 
      }

      return true;
    } catch (err) {
      throw err;
    } finally {
      await db.close();
    }
  }
}

module.exports = Contact;
