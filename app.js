const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const port = 3000;

// Setup Gunakan EJS
app.set("view engine", "ejs");
app.use(expressLayouts); // Third-party Middleware
app.use(express.static("public")); // Built-in Middleware
app.use(express.urlencoded({ extended: true }));

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
app.get("/contact", (req, res) => {
  const contacts = loadContact();

  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

app.listen(port, () => {
  console.log(`Mongo Contadt App | Listening at http://localhost:${port}`);
});
