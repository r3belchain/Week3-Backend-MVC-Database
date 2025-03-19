let db = require("../db");

class Groups {
  constructor(groupName) {
    this.groupName = groupName;
  }

  static create(groupName) {
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO Groups (groupname) VALUES (?)`, [groupName], (err) =>
        err ? reject(err) : resolve()
      );
    });
  }

  static showGroups() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Groups`, [], (err, rows) =>
        err ? reject(err) : resolve(rows)
      );
    });
  }

  static update(id, groupName) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE Groups SET groupName = ? WHERE id = ?`,
        [groupName, id],
        (err) => {
          if (err) return reject(err);
          db.get(`SELECT * FROM Groups WHERE id = ?`, [id], (err, row) =>
            err ? reject(err) : resolve(row)
          );
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM Groups WHERE id = ?`, [id], (err) =>
        err ? reject(err) : resolve()
      );
    });
  }
}

module.exports = Groups;