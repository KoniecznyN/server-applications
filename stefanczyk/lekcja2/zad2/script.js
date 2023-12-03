const express = require("express")
const app = express()
const PORT = 3000

app.use(express.static(__dirname))

app.get("/", function () {
    res.send(__dirname + "index.html")
})

app.get("/handleForm", function (req, res) {
    console.log(req.query);
    res.send(req.query);
})

app.listen(PORT, function () {
    console.log("start serwera");
})



