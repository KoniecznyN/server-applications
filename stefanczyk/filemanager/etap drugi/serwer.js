const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

const fs = require("fs");
const formidable = require("formidable");

//handlebars
const hbs = require("express-handlebars");
const { log } = require("console");
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

//parser na obiekty danych przeslanych w formularzu
app.use(
  express.urlencoded({
    extended: true,
  })
);

const rootPath = path.join(__dirname, "files");

function readDir(rootPath) {
  let data = { directories: [], files: [] };
  fs.readdir(rootPath, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.lstat(rootPath + "/" + file, (err, stats) => {
        if (stats.isDirectory()) {
          console.log(stats.isDirectory());
          data.directories.push({
            name: file,
            ico: path.join("icons", "none.jpg"),
          });
          console.log(data);
        } else
          data.files.push({
            name: file,
            ico: path.join("icons", "document.jpg"),
          });
      });
    });
  });
  console.log(data);
  return data;
}

app.get("/", function (req, res) {
  res.redirect("/filemanager");
});

app.get("/filemanager", function (req, res) {
  let context = readDir(rootPath);
  res.render("filemanager.hbs", context);
});

app.get("/show", function (req, res) {
  let filePath = path.join(rootPath, req.query.name);
  res.sendFile(filePath);
});

//usuwanie folderow
app.get("/deleteFolder", function (req, res) {
  let directoryPath = path.join(rootPath, req.query.name);

  fs.rmdir(directoryPath, (err) => {
    if (err) throw err;
  });

  res.redirect("/filemanager");
});

//usuwanie plikow
app.get("/deleteFile", function (req, res) {
  let filePath = path.join(rootPath, req.query.name);

  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });

  res.redirect("/filemanager");
});

//dodawanie folderu
app.get("/newFolder", function (req, res) {
  let directoryName = req.query.folder;
  directoryName = path.join(rootPath, directoryName);

  if (!fs.existsSync(directoryName)) {
    fs.mkdir(directoryName, (err) => {
      if (err) throw err;
      console.log("jest");
    });
  }

  res.redirect("/filemanager");
});

//dodawanie pliku
app.get("/newFile", function (req, res) {
  let fileName = req.query.file;
  fileName = path.join(rootPath, fileName);

  if (!fs.existsSync(fileName)) {
    fs.writeFile(fileName, "", (err) => {
      if (err) throw err;
    });
  }

  res.redirect("/filemanager");
});

//style
app.use(express.static("static"));
app.listen(PORT, function () {
  console.log("start");
});
