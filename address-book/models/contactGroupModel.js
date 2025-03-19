let db = require("../db");

class GroupContact {
  constructor(contactId, groupId) {
    (this.contactId = contactId), (this.groupId = groupId);
  }

  static create(contactId, groupId) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO ContactGroups (contactId, groupId) VALUES (?, ?)`,
        [contactId, groupId],
        (err) => (err ? reject(err) : resolve())
      );
    });
  }

  static showGroupContact() {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT cg.id, c.name AS contactName, g.groupName
        FROM ContactGroups cg
        JOIN Contact c ON cg.contactId = c.id
        JOIN Groups g ON cg.groupId = g.id`,
        [],
        (err, rows) => (err ? reject(err) : resolve(rows))
      );
    });
  }

  static update(id, contactId, groupId) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE ContactGroups SET contactId = ?, groupId = ? WHERE id = ?`,
        [contactId, groupId, id],
        (err) => {
          if (err) return reject(err);
          db.get(`SELECT * FROM ContactGroups WHERE id = ?`, [id], (err, row) =>
            err ? reject(err) : resolve(row)
          );
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM ContactGroups WHERE id = ?`, [id], (err) =>
        err ? reject(err) : resolve()
      );
    });
  }
}

module.exports = GroupContact;
