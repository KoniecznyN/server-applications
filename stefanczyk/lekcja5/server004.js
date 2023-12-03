const express = require("express")
const app = express()
const PORT = 3000
const hbs = require('express-handlebars');
const path = require("path")

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));
app.set('view engine', 'hbs');

const context = {
    subject: "ćwiczenie 4 - dane z tablicy, select",
    fields: [
        { name: "title" },
        { name: "author" },
        { name: "lang" }
    ],
    books: [
        { title: "Lalka", author: "B Prus", lang: "PL" },
        { title: "Hamlet", author: "W Szekspir", lang: "ENG" },
        { title: "Pan Wołodyjowski", author: "H Sienkiewicz", lang: "PL" },
        { title: "Zamek", author: "F Kafka", lang: "CZ" }
    ]
}

app.get("/", function (req, res) {
    res.render("ćwiczenie4.hbs", context)
})

function dfa(context) {
    for (let i = 0; i < 12; ++i) {

    }
}

app.get("/form", function (req, res) {
    console.log(req.query.select);
    let context2 = {}
    switch (req.query.select) {
        case "title":
            context2 = {
                subject: "ćwiczenie 4 - dane z tablicy, select",

                array: [
                    { content: "Lalka" },
                    { content: "Hamlet" },
                    { content: "Pan Wołodyjowski" },
                    { content: "Zamek" }
                ]
            }
            break;
        case "author":
            context2 = {
                subject: "ćwiczenie 4 - dane z tablicy, select",
                array: [
                    { content: "B Prus" },
                    { content: "W Szekspir" },
                    { content: "H Sienkiewicz" },
                    { content: "F Kafka" }
                ]
            }
            break;
        case "lang":
            context2 = {
                subject: "ćwiczenie 4 - dane z tablicy, select",
                array: [
                    { content: "PL" },
                    { content: "ENG" },
                    { content: "PL" },
                    { content: "CZ" }
                ]
            }
            break;
        case undefined:
            context2 = {
                subject: "ćwiczenie 4 - dane z tablicy, select",
                array: [
                    { content: "nie wybrano opcji w select" },
                ]
            }
            break
    }
    res.render("ćwiczenie4a.hbs", context2)
})

app.use(express.static("static"))

app.listen(PORT, function () {
    console.log("start aaaa serwera");
})