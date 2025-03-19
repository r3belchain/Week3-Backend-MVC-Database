let db = require("../db");
class Contact {
  constructor(name, phoneNumber, company, email) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.company = company;
    this.email = email;
  }

  static create(name, phoneNumber, company, email) {
    let newContact = new Contact(name, phoneNumber, company, email);
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Contact (name, phoneNumber, company, email) VALUES (?, ?, ?, ?)`,
        [
          newContact.name,
          newContact.phoneNumber,
          newContact.company,
          newContact.email,
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static showContact() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Contact`, (err, rows) => {
        if (err) {
          reject(err);
        }
        const contacts = rows.map(
          (row) =>
            new Contact(
              row.id,
              row.name,
              row.phoneNumber,
              row.company,
              row.email
            )
        );
        resolve(contacts);
      });
    });
  }

  static update(id, name, phoneNumber, company, email) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE Contact SET name = ?, phoneNumber = ?, company = ?, email = ? WHERE id = ?`
      ),
        [name, phoneNumber, company, email, id],
        (err) => (ree ? reject(err) : resolve());
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM Contact WHERE id = ?`, [id], (err) =>
        err ? reject(err) : resolve()
      );
    });
  }
}

module.exports = Contact;
