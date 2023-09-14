const express = require("express")
const app = express()
const PORT = 3000;

let path = require("path")

app.get("/index", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/pages/index.html"))
})

app.get("/index2", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/pages/index2.html"))
})

app.get("/index3", function (req, res) {
    res.sendFile(path.join(__dirname, "/static/pages/index3.html"))
})

app.listen(PORT, function () {
    console.log("start");
})