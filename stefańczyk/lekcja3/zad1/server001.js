const express = require("express")
const app = express()
const PORT = 3000

app.use(express.static("zad1"))
app.use(express.urlencoded({
    extended: true
}))

function wynik(pierwszaLiczba, drugaLiczba, działanie) {
    let object = []
    let wynik1 = pierwszaLiczba + drugaLiczba
    let wynik2 = pierwszaLiczba - drugaLiczba
    let wynik3 = pierwszaLiczba * drugaLiczba
    let wynik4 = pierwszaLiczba / drugaLiczba
    switch (działanie) {
        case "suma":
            object = { message: "suma dwóch liczb", wynik: JSON.stringify(wynik1) }
            break
        case "różnica":
            object = { message: "róznica dwóch liczb", wynik: JSON.stringify(wynik2) }
            break
        case "iloczyn":
            object = { message: "iloczyn dwóch liczb", wynik: JSON.stringify(wynik3) }
            break
        case "iloraz":
            object = { message: "iloraz dwóch liczb", wynik: JSON.stringify(wynik4) }
            break
        case "wszystko":
            object = [
                { message: "suma dwóch liczb", wynik: JSON.stringify(wynik1) },
                { message: "róznica dwóch liczb", wynik: JSON.stringify(wynik2) },
                { message: "iloczyn dwóch liczb", wynik: JSON.stringify(wynik3) },
                { message: "iloraz dwóch liczb", wynik: JSON.stringify(wynik4) }
            ]
    }
    return object
}

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/zad1/index.html")
})

app.post("/result", function (req, res) {
    const pierwszaLiczba = parseInt(req.body.pierwszaLiczba)
    const drugaLiczba = parseInt(req.body.drugaLiczba)
    const działanie = req.body.list
    res.send(wynik(pierwszaLiczba, drugaLiczba, działanie))

})

app.listen(PORT, function () {
    console.log("start serwera");
})