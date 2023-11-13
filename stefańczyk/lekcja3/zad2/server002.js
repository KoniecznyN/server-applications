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

app.post("/test", function (req, res) {
  res.send(JSON.stringify(req.body));
  // res.send(req.body);
});

app.listen(PORT, function () {
  console.log("start serwera");
});
