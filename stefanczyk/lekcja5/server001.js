const express = require("express")
const app = express()
const PORT = 3000
const hbs = require('express-handlebars');
const path = require("path")

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');

app.get("/login", function (req, res) {
    res.render('login.hbs');
})

app.get("/index", function (req, res) {
    res.render('index.hbs');
})

app.use(express.static("static"))
app.listen(PORT, function () {
    console.log("start serwera");
})