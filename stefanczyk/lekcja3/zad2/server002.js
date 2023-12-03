const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("zad2"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/test", function (req, res) {
  res.send(JSON.stringify(req.body));
});

app.listen(PORT, function () {
  console.log("start serwera");
});
