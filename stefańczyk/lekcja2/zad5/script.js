const express = require("express")
const app = express()
const PORT = 3000

app.get("/", (req, res) => {
    console.log("witam");
    let samochody = [
        { car: "samochod1" }
    ]
    res.send("")
})

app.listen(PORT, () => {
    console.log("start serwera");
})