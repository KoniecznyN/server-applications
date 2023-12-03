const express = require("express");
const app = express();
const PORT = 3000;

function chuj(count, bg) {
  let dupa = "";
  for (i = 0; i < count; i++) {
    dupa +=
      '<div style="height: 100px; width: 100px; background-color: ' +
      bg +
      '; margin: 20px; display: flex; justify-content: center; align-items: center; color: black;">' +
      (i + 1) +
      "</div>";
  }
  return dupa;
}

app.get("/", function (req, res) {
  console.log(req.query.count);
  let count = req.query.count;
  let bg = req.query.bg;
  res.send(chuj(count, bg));
});

app.listen(PORT, function () {
  console.log("start");
});
