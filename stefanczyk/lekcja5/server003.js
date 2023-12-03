const express = require("express")
const app = express()
const PORT = 3000
const hbs = require('express-handlebars');
const path = require("path")

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');

const context = {
    subject: "ćwiczenie 3 - dane z tablicy obiektów",
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Homo Deus", author: "Yuval Noah Harari", lang: "CZ" }
    ]
}

app.get("/", function (req, res) {
    res.render("ćwiczenie3.hbs", context)
})

app.use(express.static("static"))

app.listen(PORT, function () {
    console.log("start serwera");
})