const mongoose = require("mongoose");

const Contact = mongoose.model("Contact", {
  // const KaryawanSchema = new mongoose.SchemaTypes({
  nama: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  no_HP: {
    type: String,
  },
});

module.exports = Contact;
