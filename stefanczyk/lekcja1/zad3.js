const express = require("express");
const app = express();
const PORT = 3000;

function change(value, toRad) {
  let result = 0;
  let toRadb = toRad === "true";
  // let toRadb = JSON.parse(toRad);
  if (toRadb) {
    result = (3.14 * value) / 180;
    return value + " stopni to: " + result + " radianów.";
  } else {
    result = (180 * value) / 3.14;
    return value + " radianów to: " + result + " stopni.";
  }
}

app.get("/", (req, res) => {
  let value = req.query.value;
  let toRad = req.query.toRad;
  res.send(change(value, toRad));
});

app.listen(PORT, (req, res) => {
  console.log("start");
});
