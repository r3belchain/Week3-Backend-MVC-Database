let connectDB = require("../db");

class GroupContact {
  constructor(contactId, groupId) {
    (this.contactId = contactId), (this.groupId = groupId);
  }

  static async create(contactId, groupId) {
    const db = await connectDB();
    try {
      const createContact = await db.run(
        `INSERT INTO ContactGroups (contactId, groupId) VALUES (?, ?)`,
        [contactId, groupId]
      );
      return createContact;
    } catch (err) {
      throw err;
    } finally {
      await db.close();
    }
  }

  static async showGroupContact() {
    const db = await connectDB();
    try {
      const showAll = await db.all(
        `SELECT cg.id, c.name AS contactName, g.groupName
        FROM ContactGroups cg
        JOIN Contact c ON cg.contactId = c.id
        JOIN Groups g ON cg.groupId = g.id`
      );
      return showAll;
    } catch (err) {
      throw err;
    } finally {
      await db.close();
    }
  }

  static async update(id, contactId, groupId) {
    const db = await connectDB();
    try {
      const result = await db.run(
        `UPDATE Groups SET groupName = ? WHERE id = ?`,
        [groupName, id]
      );

      if (result.changes === 0) {
        throw new Error(`Group with id ${id} not found.`);
      }

      const updatedGroup = await db.get(`SELECT * FROM Groups WHERE id = ?`, [
        id,
      ]);
      return updatedGroup;
    } catch (err) {
      throw err;
    } finally {
      await db.close();
    }
  }

  static async delete(id) {
    const db = await connectDB();
    try {
      const result = await db.run(`DELETE FROM Groups WHERE id = ?`, [id]);
      if (result.changes === 0) {
        throw new Error(`Group with id ${id} not found.`);
      }
    } catch (err) {
      throw err;
    } finally {
      await db.close();
    }
  }
}

module.exports = GroupContact;
