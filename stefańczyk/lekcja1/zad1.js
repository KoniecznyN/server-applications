const express = require("express");
const app = express();
const PORT = 3000;

let path = require("path");

app.use(express.static(__dirname + "/static/pages"));

app.get("/koty", function (req, res) {
  res.sendFile(path.join(__dirname, "/static/pages/index.html"));
});

app.get("/auta", function (req, res) {
  res.sendFile(path.join(__dirname, "/static/pages/index2.html"));
});

app.get("/drzewa", function (req, res) {
  res.sendFile(path.join(__dirname, "/static/pages/index3.html"));
});

app.listen(PORT, function () {
  console.log("start");
});
