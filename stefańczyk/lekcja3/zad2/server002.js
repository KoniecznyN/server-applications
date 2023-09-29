const express = require("express")
const app = express()
const PORT = 3000

app.use(express.static("zad2"))
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
            object = { message: "suma dwóch liczb", wynik: JSON.stringify(wynik1, null, 5) }
            break
        case "różnica":
            object = { message: "róznica dwóch liczb", wynik: JSON.stringify(wynik2, null, 5) }
            break
        case "iloczyn":
            object = { message: "iloczyn dwóch liczb", wynik: JSON.stringify(wynik3, null, 5) }
            break
        case "iloraz":
            object = { message: "iloraz dwóch liczb", wynik: JSON.stringify(wynik4, null, 5) }
            break
        case "wszystko":
            object = [
                { message: "suma dwóch liczb", wynik: JSON.stringify(wynik1, null, 5) },
                { message: "róznica dwóch liczb", wynik: JSON.stringify(wynik2, null, 5) },
                { message: "iloczyn dwóch liczb", wynik: JSON.stringify(wynik3, null, 5) },
                { message: "iloraz dwóch liczb", wynik: JSON.stringify(wynik4, null, 5) }
            ]
    }
    return object
}

app.get("/", function (req, res) {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: object
    };
    res.sendFile(__dirname + "/zad1/index.html")
})



app.listen(PORT, function () {
    console.log("start serwera");
})