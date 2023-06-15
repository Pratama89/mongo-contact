const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const { body, validationResult, check, Result } = require("express-validator");
const methodOverride = require("method-override");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

require("./utils/db");
const Contact = require("./model/contact");
const { error } = require("console");

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride("_method"));

// Setup Gunakan EJS
app.set("view engine", "ejs");
app.use(expressLayouts); // Third-party Middleware
app.use(express.static("public")); // Built-in Middleware
app.use(express.urlencoded({ extended: true }));

// Konfigurasi Flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    saveUninitialized: true,
  })
);
app.use(flash());

// Halaman Home
app.get("/", (req, res) => {
  res.render("index", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

// Halaman About
app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

// Halaman Kontak
app.get("/contact", async (req, res) => {
  // Contact.find().then((contact) => {
  //   res.send(contact);
  // });

  const contacts = await Contact.find();

  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

// Halaman Form tambah data kontak
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    layout: "layouts/main-layout",
    title: "Form Tambah Contact",
  });
});

// Proses Tambah Data Kontak
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("Nama kontak sudah digunakan!");
      }
      return true;
    }),

    check("alamat", "Alamat tidak sesuai").isString(),
    check("no_HP", "No HP tidak sesuai").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        layout: "layouts/main-layout",
        title: "Form Tambah Data Contact",
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        req.flash("msg", "Data kontak berhasil ditambahkan");
        res.redirect("/contact");
      });
      // kirimkan Flash massage
    }
  }
);

// proses delete kontak
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });

//   // Jika kontak tidak ada
//   if (!contact) {
//     res.status(404);
//     res.render("error404", {
//       layout: "layouts/main-layout",
//       title: "Error 404",
//     });
//   } else {
//     Contact.deleteOne({ _id: contact._id }).then((result) => {
//       req.flash("msg", "Data kontak berhasil dihapus");
//       res.redirect("/contact");
//     });
//     // kirimkan Flash massage
//   }
// });
app.delete("/contact", (req, res) => {
  // res.send(req.body);
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "Data kontak berhasil dihapus");
    res.redirect("/contact");
  });
});

// Halaman Form ubah data kontak
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("edit-contact", {
    layout: "layouts/main-layout",
    title: "Form Ubah Data Contact",
    contact,
  });
});

// Proses Ubah Data
app.put(
  "/contact",
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama kontak sudah digunakan!");
      }
      return true;
    }),

    check("alamat", "Alamat tidak sesuai").isString(),
    check("no_HP", "No HP tidak sesuai").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        layout: "layouts/main-layout",
        title: "Form Tambah Data Contact",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            alamat: req.body.alamat,
            no_HP: req.body.no_HP,
          },
        }
      ).then((result) => {
        // kirimkan Flash massage
        req.flash("msg", "Data kontak berhasil diubah!");
        res.redirect("/contact");
      });
    }
  }
);

// Halaman detail kontak
app.get("/contact/:nama", async (req, res) => {
  // const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("detail", {
    layout: "layouts/main-layout",
    title: "Halaman Detail Contact",
    contact,
  });
});




app.listen(port, () => {
  console.log(`Mongo Contadt App | Listening at http://localhost:${port}`);
});
