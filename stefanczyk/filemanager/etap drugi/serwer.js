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
          data.directories.push({
            name: file,
            ico: path.join("icons", "folder.png"),
          });
        } else
          data.files.push({
            name: file,
            ico: path.join("icons", "file.png"),
          });
      });
    });
  });
  console.log(data);
  return data;
}

function uploadFile(file, oldPath) {
  let filePath;
  if (file.counter == 0) {
    filePath = path.join(rootPath, file.name);
  } else {
    filePath = path.join(rootPath, `${file.name}(${file.counter})`);
  }

  if (!fs.existsSync(filePath)) {
    fs.rename(oldPath, filePath, (err) => {
      if (err) throw err;
    });
    return;
  } else {
    file.counter++;
    uploadFile(file, oldPath);
  }
}

function newFolder(directory) {
  let directoryName;
  if (directory.counter == 0) {
    directoryName = directory.name;
  } else {
    directoryName = `${directory.name}(${directory.counter})`;
  }

  if (!fs.existsSync(directoryName)) {
    fs.mkdir(directoryName, (err) => {
      if (err) throw err;
    });
    return;
  } else {
    directory.counter++;
    newFolder(directory);
  }
}

function newFile(file) {
  let fileName;
  if (file.counter == 0) {
    fileName = file.name;
  } else {
    fileName = `${file.name}(${file.counter})`;
  }

  if (!fs.existsSync(fileName)) {
    fs.writeFile(fileName, "", (err) => {
      if (err) throw err;
    });
    return;
  } else {
    file.counter++;
    newFile(file);
  }
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

//dodawanie folderu
app.get("/newFolder", function (req, res) {
  let directoryName = req.query.folder;
  directoryName = path.join(rootPath, directoryName);
  let directory = { name: directoryName, counter: 0 };

  newFolder(directory);
  res.redirect("/filemanager");
});

//dodawanie pliku
app.get("/newFile", function (req, res) {
  let fileName = req.query.file;
  fileName = path.join(rootPath, fileName);
  let file = { name: fileName, counter: 0 };

  newFile(file);
  res.redirect("/filemanager");
});

//upload
app.post("/upload", function (req, res) {
  let form = formidable({});
  form.keepExtensions = true;
  form.multiples = true;
  form.uploadDir = rootPath;
  form.parse(req, function (err, fields, files) {
    const isArray = Array.isArray(files.image);
    if (isArray) {
      files.image.forEach((element) => {
        let file = { name: element.name, counter: 0 };
        uploadFile(file, element.path);
      });
    } else {
      let file = { name: files.image.name, counter: 0 };
      uploadFile(file, files.image.path);
    }
    res.redirect("/filemanager");
  });
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

//style
app.use(express.static("static"));
app.listen(PORT, function () {
  console.log("start");
});
