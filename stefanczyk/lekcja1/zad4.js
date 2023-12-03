const express = require("express");
const app = express();
const PORT = 3000;

const linksAmount = 50;
const maxProductId = 100;

function generateLinks() {
  let result = "";
  for (i = 0; i < linksAmount; ++i) {
    const productId = Math.floor(Math.random() * (maxProductId + 1));
    result += `<a style="font-size: 1.5em; font-family: monospace" href="/product/${productId}"> Strona ${productId} </a> <br>`;
  }
  return result;
}

const links = generateLinks();

app.get("/", (req, res) => {
  res.send(links);
});

app.get("/product/:id", (req, res) => {
  let id = req.params.id;
  res.send("to jest podstrona o id = " + id);
});

app.listen(PORT, (req, res) => {
  console.log("start");
});
