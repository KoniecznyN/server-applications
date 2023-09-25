const express = require("express");
const app = express();
const PORT = 3000;

const create = () => {
  let cars = [
    "audi",
    "opel",
    "francuz",
    "średni fiat",
    "mercedes",
    "małe fajne autko",
  ];
  return cars
    .map((element, index) => {
      return `
      <tr>
        <td>${element}</td>
        <td>
          <input type="radio" name="${index}" id="" value="nowe"/>
        </td>
        <td>
          <input type="radio" name="${index}" id="" value="uzywane"/>
        </td>
        <td>
          <input type="radio" name="${index}" id="" value="powypadkowe"/>
        </td>
      </tr>
    `;
    })
    .join("");
};

app.get("/", (req, res) => {
  console.log("witam");
  res.send(`
    <form action="/cars" method="get">
        <table>
            <tr>
                <td></td>
                <td>nowe</td>
                <td>używane</td>
                <td>powypadkowe</td>
            </tr>
            ${create()}
        </table>
        <input type="submit" value="submit" />
    </form>
  `);
});

app.get("/cars", (req, res) => {
  const cars = { nowe: 0, uzywane: 0, powypadkowe: 0 };
  for (let key in req.query) {
    const value = req.query[key];
    cars[value]++;
  }
  res.send(cars);
});

app.listen(PORT, () => {
  console.log("start serwera");
});
