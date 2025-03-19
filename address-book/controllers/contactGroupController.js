const GroupContact = require("../models/contactGroupModel");
const View = require("../view/view");

class ContactGroupsController {
  static async create(contactId, groupId) {
    try {
      await GroupContact.create(contactId, groupId);
      View.showSuccess(`Group Kontak berhasil ditambahkan!`);
    } catch (err) {
      View.showError("Gagal menambahkan contactId, groupId: " + err.message);
    }
  }

  static async showAll() {
    try {
      const contactGroups = await GroupContact.showGroupContact();
      if (contactGroups.length === 0) {
        View.showWarning("Belum ada Group Kontak.");
      } else {
        View.showTable(contactGroups, "Daftar Group Kontak");
      }
    } catch (err) {
      View.showError("Gagal menampilkan Group Kontak: " + err.message);
    }
  }

  static async update(id, contactId, groupId) {
    try {
     const updatedContactGroup = await GroupContact.update(
       id,
       contactId,
       groupId
     );
     if (updatedContactGroup) {
       View.showSuccess("Contact Group berhasil diperbarui:");
       View.showTable([updatedContactGroup]);
     } else {
       View.showWarning("Contact Group tidak ditemukan!");
     }
    } catch (err) {
      View.showError("Gagal mengupdate Group Kontak: " + err.message);
    }
  }

  static async delete(id) {
    try {
      await GroupContact.delete(id);
      View.showSuccess(`Data berhasil dihapus!`);
    } catch (err) {
      View.showError("Gagal menghapus Group Kontak: " + err.message);
    }
  }
}

module.exports = ContactGroupsController;
