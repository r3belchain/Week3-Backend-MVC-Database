const Groups = require("../models/groupModel");
const View = require("../view/view");

class GroupsController {
  static async create(groupName) {
    try {
      await Groups.create(groupName);
      View.showSuccess(`Group berhasil ditambahkan!`);
    } catch (err) {
      View.showError("Gagal menambahkan Group: " + err.message);
    }
  }

  static async showAll() {
    try {
      const showGroups = await Groups.showGroups();
      if (showGroups.length === 0) {
        View.showWarning("Belum ada Group.");
      } else {
        View.showTable(showGroups, "Daftar Group");
      }
    } catch (err) {
      View.showError("Gagal menampilkan Group: " + err.message);
    }
  }

  static async update(id, groupName) {
    try {
      const updatedGroups = await Groups.update(id, groupName);
      if (updatedGroups) {
        View.showSuccess("Group berhasil diperbarui:");
        View.showTable([updatedGroups]);
      } else {
        View.showWarning("Group tidak ditemukan!");
      }
    } catch (err) {
      View.showError("Gagal mengupdate Group: " + err.message);
    }
  }

  static async delete(id) {
    try {
      await Groups.delete(id);
      View.showSuccess(`Data berhasil dihapus!`);
    } catch (err) {
      View.showError("Gagal menghapus Group: " + err.message);
    }
  }
}

module.exports = GroupsController;
