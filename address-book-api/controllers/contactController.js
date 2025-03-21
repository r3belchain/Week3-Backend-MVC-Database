const Contact = require("../models/contactModel");

class ContactController {
  static async create(req, res) {
    const { name, phoneNumber, company, email } = req.body;
    try {
      const create = await Contact.create(name, phoneNumber, company, email);
      return res.status(201).json({ message: "Berhasil membuat kontak!", data: create });
    } catch (err) {
      return res.status(500).json({ message: "Gagal membuat kontak!", error: err.message });
    }
  }

  static async showAll(req, res) {
    try {
      const contacts = await Contact.showContact();
      if (contacts.length === 0) {
      return res.status(404).json({ message: "Kontak tidak ada!" });
      } 
        return res
          .status(200)
          .json({ message: "Berhasil menampilkan kontak!", data: contacts });
    } catch (err) {
      return res.status(500).json({ message: "Gagal menampilkan kontak!", error: err.message });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { name, phoneNumber, company, email } = req.body;
    try {
      const updateContact = await Contact.update(
        id,
        name,
        phoneNumber,
        company,
        email
      );
        if (!updateContact) {
        return res.status(404).json({ message: "Kontak tidak ditemukan!" });
      }
      return res.status(200).json({ message: "Berhasil mengupdate kontak!", data: updateContact });
    } catch (err) {
      return res.status(500).json({ message: "Gagal mengupdate kontak!", error: err.message });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Contact.delete(id);
       if (!deleted) {
        return res.status(404).json({ message: "Kontak tidak ditemukan!" });
      }
      return res.status(200).json({ message: "Berhasil menghapus kontak!" });
    } catch (err) {
      return res.status(500).json({ message: "Gagal menghapus kontak!", error: err.message });
    }
  }
}

module.exports = ContactController;
