const express = require("express")
const app = express()
const PORT = 3000;

app.get("/", function (req, res) {
    res.send("brak strony -  takiego produktu")
})

app.listen(PORT, function () {
    console.log("start serwera na porcie 3000 (5)");
})