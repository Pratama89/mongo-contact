const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/pharma", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Membuat Scema
const Contact = mongoose.model("Contact", {
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

// Menambahkan 1 Data
const contact1 = new Contact({
  nama: "Sari Wahyuningsih",
  alamat: "Karangtengah, Tangerang",
  no_HP: "085241554874",
});

contact1.save().then((contact) => console.log(contact));
