let connectDB = require("../db");
class Contact {
  constructor(name, phoneNumber, company, email) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.company = company;
    this.email = email;
  }

  static async create(name, phoneNumber, company, email) {
    const db = await connectDB();
    try {
      let newContact = new Contact(name, phoneNumber, company, email);
      await db.run(
        `INSERT INTO Contact (name, phoneNumber, company, email) VALUES (?, ?, ?, ?)`,
        [
          newContact.name,
          newContact.phoneNumber,
          newContact.company,
          newContact.email,
        ]
      );
      return newContact;
    } catch (err) {
      throw err
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
        (row) =>
          new Contact(row.name, row.phoneNumber, row.company, row.email)
      );
      return contacts;
    } catch (err) {
      throw err
    } finally {
      if (db) {
        await db.close();
      }
    }
  }

  static async update(id, name, phoneNumber, company, email) {
    const db = await connectDB();
    try {
      await db.run(
        `UPDATE Contact SET name = ?, phoneNumber = ?, company = ?, email = ? WHERE id = ?`,
        [name, phoneNumber, company, email, id]
      );
    } catch (err) {
      throw err
    } finally {
      await db.close();
    }
  }

  static async delete(id) {
    const db = await connectDB();
    try {
       await db.run(`DELETE FROM Contact WHERE id = ?`, [id]);
    } catch(err) {
      throw err
    } finally {
      await db.close()
    }
  }
}

module.exports = Contact;
