const Groups = require("../models/groupModel");

class GroupsController {
  static async create(req, res) {
    const { groupName } = req.body;
    if (!groupName) {
      return res.status(400).json({ message: "Nama Grup dibutuhkan!" });
    }
    try {
      const create = await Groups.create(groupName);
      return res
        .status(201)
        .json({ message: "Berhasil membuat Grup!",data: create });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Gagal membuat Grup!", error: err.message });
    }
  }

  static async showAll(req, res) {
    try {
      const showGroups = await Groups.showGroups();
      if (showGroups.length === 0) {
        return res.status(404).json({ message: "Grup tidak ditemukan!" });
      } else {
        return res.status(200).json({
          message: "Berhasil menampilkan Grup!",
          data: showGroups,
        });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Gagal menampilkan Grup!", error: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { groupName } = req.body;

    if (!groupName) {
      return res.status(400).json({ message: "Nama Grup dibutuhkan!" });
    }
    try {
      const updatedGroups = await Groups.update(id, groupName);
      if (updatedGroups) {
        return res
          .status(200)
          .json({ message: "Berhasil memperbarui Grup!",data: updatedGroups });
      } else {
        return res.status(404).json({ message: "Grup tidak ditemukan!" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Gagal memperbarui Grup!", error: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Groups.delete(id);
      if (!deleted) {
        return res
          .status(404)
          .json({ message: "Grup tidak ditemukan!" });
      }
      return res
        .status(200)
        .json({ message: "Berhasil menghapus Grup!"});
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Gagal menghapus Grup!", error: err.message });
    }
  }
}

module.exports = GroupsController;
