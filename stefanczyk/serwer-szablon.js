const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

//handlebars
const hbs = require("express-handlebars");
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

//baza danych netdb
const Datastore = require("nedb");

const coll = new Datastore({
  filename: "kolekcja.db",
  autoload: true,
});

const doc = {
  a: "a",
  b: "b",
};

coll.insert(doc, function (err, newDoc) {
  console.log("dodano dokument (obiekt):");
  console.log(newDoc);
  console.log("unikalne id dokumentu: " + newDoc._id);
});

//parser na obiekty danych przeslanych w formularzu
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.send("strona");
});

//style
app.use(express.static("static"));
app.listen(PORT, function () {
  console.log("start");
});
