const express = require("express");
const app = express();
const PORT = 3000;

function random() {
  let result = "";
  for (i = 0; i < 50; i++) {
    const number = Math.floor(Math.random() * (50 - 1)) + 1;
    result +=
      '<a style="font-size: 1.5em; font-family: monospace" href="/product/' +
      number +
      '">strona' +
      number +
      "</a> <br>";
  }
  return result;
}

app.get("/", (req, res) => {
  res.send(random());
});

app.get("/product/:id", (req, res) => {
  let id = req.params.id;
  res.send("to jest podstrona o id = " + id);
});

app.listen(PORT, (req, res) => {
  console.log("start");
});
