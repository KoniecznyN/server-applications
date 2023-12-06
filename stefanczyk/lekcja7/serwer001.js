const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");

//handlebars
const hbs = require("express-handlebars");
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

//parser na obiekty danych przeslanych w formularzu
app.use(
  express.urlencoded({
    extended: true,
  })
);

// baza danych netdb
const Datastore = require("nedb");
const { BlockList } = require("net");

const coll = new Datastore({
  filename: "cars.db",
  autoload: true,
});

app.get("/", function (req, res) {
  res.render("index.hbs");
});

//add car
app.get("/addCar", function (req, res) {
  res.render("add.hbs");
});

app.post("/addCar", function (req, res) {
  const doc = {
    ubezpieczony: req.body.ubezpieczony == "on" ? "yes" : "no",
    benzyna: req.body.benzyna == "on" ? "yes" : "no",
    uszkodzony: req.body.uszkodzony == "on" ? "yes" : "no",
    naped4x4: req.body.naped4x4 == "on" ? "yes" : "no",
    toDelete: "off",
  };
  coll.insert(doc, function (err, newDoc) {
    res.render("add.hbs", newDoc);
  });
});

//cars list
app.get("/carsList", function (req, res) {
  coll.find({}, function (err, docs) {
    const context = { cars: docs };
    res.render("list.hbs", context);
  });
});

//delete cars
app.get("/deleteCar", function (req, res) {
  coll.find({}, function (err, docs) {
    const context = { cars: docs };
    res.render("delete.hbs", context);
  });
});

app.post("/deleteCars", function (req, res) {
  coll.remove({}, { multi: true }, function (err, newDoc) {});
  res.render("delete.hbs");
});

app.get("/deleteOne", function (req, res) {
  if (true) {
    coll.remove({ _id: req.query.delete }, function (err, numRemoved) {});
  }
  coll.find({}, function (err, docs) {
    const context = { cars: docs };
    res.render("delete.hbs", context);
  });
});

app.get("/deleteSelected", function (req, res) {
  const selected = Object.keys(req.query);
  if (true) {
    for (let key in selected) {
      coll.remove({ _id: selected[key] }, function (err, numRemoved) {});
    }
  }
  coll.find({}, function (err, docs) {
    const context = { cars: docs };
    res.render("delete.hbs", context);
  });
});

//edit cars
app.get("/editCars", function (req, res) {
  res.render("edit.hbs");
});

app.listen(PORT, function () {
  console.log("start");
});
