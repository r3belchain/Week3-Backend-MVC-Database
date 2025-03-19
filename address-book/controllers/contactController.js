const Contact = require("../models/contactModel");
const View = require("../view/view");

class ContactController {
  static async create(name, phoneNumber, company, email) {
    try {
      await Contact.create(name, phoneNumber, company, email);
      View.showSuccess(`Kontak ${name} berhasil ditambahkan!`);
    } catch (err) {
      View.showError("Gagal menambahkan kontak: " + err.message);
    }
  }

  static async showAll() {
    try {
      const contacts = await Contact.showContact();
      if (contacts.length === 0) {
        View.showWarning("Belum ada kontak.");
      } else {
        View.showTable(contacts, "Daftar Kontak");
      }
    } catch (err) {
      View.showError("Gagal menampilkan kontak: " + err.message);
    }
  }


  static async update(id, name, phoneNumber, company, email) {
    try {
      const updateContact = await Contact.update(
        id,
        name,
        phoneNumber,
        company,
        email
      );
      View.showTable(updateContact)
    } catch(err) {
       View.showError("Gagal mengupdate kontak: " + err.message);
    }
  }


  static async delete(id) {
    try {
      await Contact.delete(id)
      View.showSuccess(`Data berhasil dihapus!`)
    } catch(err) {
       View.showError("Gagal menghapus kontak: " + err.message);
    }
  }
}

module.exports = ContactController;
