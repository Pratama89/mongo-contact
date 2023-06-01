const mongoose = require("mongoose");

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/test");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

mongoose.connect("mongodb://127.0.0.1:27017/pharma", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});



// Membuat Schema


  // const Karyawan = mongoose.model('Karyawan', KaryawanSchema);


// Menambahkan 1 Data
// const contact1 = new Contact({
//   nama: "Sari Wahyuningsih",
//   alamat: "Karangtengah, Tangerang",
//   no_HP: "085241554874",
// });

// // simpan ke Collection
// contact1.save().then((contact) => console.log(contact));
