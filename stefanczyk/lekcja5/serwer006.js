const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

//handlebars
const hbs = require("express-handlebars");
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  hbs({
    defaultLayout: "main.hbs",
    helpers: {
      shortTitle: function (title) {
        return "gfsgf";
      },
      guwno: function (lang) {
        if (lang == "PL") {
          return "POOLSKA GUROOM";
        } else return lang;
      },
    },
  })
);
app.set("view engine", "hbs");

const context = {
  subject: "ćwiczenie 4 - dane z tablicy, select",
  fields: [{ name: "title" }, { name: "author" }, { name: "lang" }],
  books: [
    { title: "Lalka", author: "B Prus", lang: "PL" },
    { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
    { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
    { title: "Zamek", author: "F Kafka", lang: "CZ" },
  ],
};

app.get("/", function (req, res) {
  res.render("ćwiczenie6.hbs", context);
});

app.get("/handleForm", function (req, res) {
  let array = [];
  for (let i = 0; i < context.books.length; i++) {
    array.push({ title: "", author: "", lang: "" });
  }
  const context2 = { array: array };

  if (
    req.query.title == undefined &&
    req.query.author == undefined &&
    req.query.lang == undefined
  ) {
    res.send("BŁĘDNE DANE");
  }
  if (req.query.title == "on") {
    for (let i = 0; i < context2.array.length; i++) {
      context2.array[i].title = context.books[i].title;
    }
  }
  if (req.query.author == "on") {
    for (let i = 0; i < context2.array.length; i++) {
      context2.array[i].author = context.books[i].author;
    }
  }
  if (req.query.lang == "on") {
    for (let i = 0; i < context2.array.length; i++) {
      context2.array[i].lang = context.books[i].lang;
    }
  }
  console.log(req.query);
  console.log(context2);
  res.render("ćwiczenie6a.hbs", context2);
});

//style
app.use(express.static("static"));
app.listen(PORT, function () {
  console.log("start");
});
