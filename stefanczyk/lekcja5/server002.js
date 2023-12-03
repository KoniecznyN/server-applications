const express = require("express");
const app = express();
const PORT = 3000;
const hbs = require("express-handlebars");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

const context = {
  subject: "ćwiczenie 2 - podstawowy context",
  content:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam nemo eius soluta nisi, eveniet voluptatum amet vitae, quod id architecto, praesentium optio perspiciatis! Voluptatum corrupti aut odit fuga blanditiis in? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam nemo eius soluta nisi, eveniet voluptatum amet vitae, quod id architecto, praesentium optio perspiciatis! Voluptatum corrupti aut odit fuga blanditiis in?",
  footer: "to jest stopka na mojej stronie",
};

app.get("/", function (req, res) {
  res.render("ćwiczenie2.hbs", context);
});

app.use(express.static("static"));

app.listen(PORT, function () {
  console.log("start serwera");
});
