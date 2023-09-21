const express = require("express")
const app = express()
const PORT = 3000;

app.use(express.static(__dirname))

app.get("/", (req, res) => {
    res.send(__dirname + "index.html")
})

app.get("/handleForm", (req, res) => {
    let color = req.query.color
    res.send(`<body style="margin: 0; padding: 0;"><div style="width: 100vw; height: 100vh; background-color: ${color}; color: white; font-size: 15em; text-align: center;">${color}</div></body>`)
})

app.listen(PORT, () => {
    console.log("start serwera");
})