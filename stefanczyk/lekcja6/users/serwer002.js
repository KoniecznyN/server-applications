const express = require("express");
const app = express();
const PORT = 3000;
const hbs = require("express-handlebars");
const path = require("path");

const Datastore = require("nedb");
const coll2 = new Datastore({
  filename: "users.db",
  autoload: true,
});

app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

let lp = 0;

app.get("/", function (req, res) {
  coll2
    .find({})
    .sort({ time: 1 })
    .exec(function (err, docs) {
      const context = { users: docs };
      lp = docs.length;
      res.render("view2.hbs", context);
    });
});

app.get("/addUser", function (req, res) {
  const username = req.query.username;
  const password = req.query.password;
  const date = new Date().getTime();
  const doc = {
    name: username,
    password: password,
    time: date,
    lp: lp + 1,
  };
  coll2.insert(doc, function (err, newDoc) {});

  coll2
    .find({})
    .sort({ time: 1 })
    .exec(function (err, docs) {
      const context = { users: docs };
      lp = docs.length;
      res.render("view2.hbs", context);
    });
});

app.use(express.static("static"));

app.listen(PORT, function () {
  console.log("start serwera");
});
