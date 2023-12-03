const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("zad4"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/fetch", function (req, res) {
  res.send(JSON.stringify(req.body));
  //   console.log(req.body);
});

app.listen(PORT, function () {
  console.log("start serwera");
});
