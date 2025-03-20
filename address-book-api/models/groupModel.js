let connectDB = require("../db");

class Groups {
  constructor(groupName) {
    this.groupName = groupName;
  }

  static async create(groupName) {
    const db = await connectDB();
    try {
      const createContact = await db.run(
        `INSERT INTO Groups (groupName) VALUES (?)`,
        [groupName]
      );
      return createContact;
    } catch (err) {
      throw err;
    } finally {
      await db.close();
    }
  }

  static async showGroups() {
    const db = await connectDB();
    try {
      const showAll = await db.all(`SELECT * FROM Groups`);
      return showAll;
    } catch (err) {
      throw err;
    } finally {
      await db.close();
    }
  }

  static async update(id, groupName) {
    const db = await connectDB();
    try {
      await db.run(`UPDATE Groups SET groupName = ? WHERE id = ?`, [
        groupName,
        id,
      ]);
      const update = await db.get(`SELECT * FROM Groups WHERE id = ?`, [id]);
      return update;
    } catch (err) {
      throw err;
    } finally {
      await db.close();
    }
  }

  static async delete(id) {
    const db = await connectDB();
    try {
      await db.run(`DELETE FROM Groups WHERE id = ?`, [id]);
    } catch (err) {
      throw err;
    } finally {
      await db.close()
    }
  }
}

module.exports = Groups;
