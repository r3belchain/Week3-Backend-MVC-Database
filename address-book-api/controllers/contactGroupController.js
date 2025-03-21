const GroupContact = require("../models/contactGroupModel");

class ContactGroupsController {
  static async create(req, res) {
    const { contactId, groupId } = req.body;
    if (!contactId || !groupId) {
      return res
        .status(400)
        .json({ message: "ContactId dan GroupId dibutuhkan." });
    }
    try {
      await GroupContact.create(contactId, groupId);
      return res.status(201).json({ message: "Berhasil membuat Grup Kontak!" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Gagal membuat kontak!", error: err.message });
    }
  }

  static async showAll(req, res) {
    try {
      const contactGroups = await GroupContact.showGroupContact();
      if (contactGroups.length === 0) {
        return res.status(404).json({ message: "Grup Kontak tidak ada!" });
      }
      return res.status(200).json({
        message: "Berhasil menampilkan Grup Kontak!",
        data: contactGroups,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Gagal menampilkan Grup Kontak!",
        error: err.message,
      });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { contactId, groupId } = req.body;
    try {
      const updatedContactGroup = await GroupContact.update(
        id,
        contactId,
        groupId
      );
      if (updatedContactGroup) {
        return res.status(200).json({
          message: "Berhasil memperbarui Grup Kontak!",
          data: updatedContactGroup,
        });
      } else {
        return res
          .status(404)
          .json({ message: "Grup Kontak tidak ditemukan!" });
      }
    } catch (err) {
      return res.status(500).json({
        message: "Kesalahan dalam memperbarui Grup Kontak!",
        error: err.message,
      });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await GroupContact.delete(id);
      if (!deleted) {
        return res
          .status(404)
          .json({ message: "Grup Kontak tidak ditemukan!" });
      }
      return res
        .status(200)
        .json({ message: "Berhasil menghapus Grup Kontak!" });
    } catch (err) {
      return res.status(500).json({
        message: "Kesalahan dalam menghapus Grup Kontak!",
        error: err.message,
      });
    }
  }
}

module.exports = ContactGroupsController;
