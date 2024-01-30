const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

const fs = require("fs");
const formidable = require("formidable");

//handlebars
const hbs = require("express-handlebars");
const { log } = require("console");
const { create } = require("domain");
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

//parser na obiekty danych przeslanych w formularzu
app.use(
  express.urlencoded({
    extended: true,
  })
);

let rootElements = [__dirname, "files"];

function readDir(rootPath) {
  let data = { directories: [], files: [], root: [], changeName: "" };
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
  return data;
}

function uploadFile(file, oldPath) {
  let rootPath = createPath();
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

function createPath() {
  let string = "";
  for (let i = 0; i < rootElements.length; i++) {
    string += rootElements[i];
    if (rootElements[i] != rootElements[rootElements.length - 1]) {
      string += "\\";
    }
  }
  return string;
}

let root = [];

app.get("/", function (req, res) {
  res.redirect("/filemanager");
});

app.get("/filemanager", function (req, res) {
  if (req.query.name != undefined) {
    rootElements.push(req.query.name);
    root.push({ name: req.query.name });
  }

  if (req.query.path != undefined) {
    let index = rootElements.indexOf(req.query.path);
    let length = rootElements.length - index;
    rootElements.splice(index + 1, length);
    root.splice(index - 1, length);
  }

  let rootPath = createPath();
  let context = readDir(rootPath);
  context.root = root;

  if (root.length > 0) {
    context.changeName = "witam";
  } else context.changeName = "";
  res.render("filemanager.hbs", context);
});

//show
app.get("/show", function (req, res) {
  let rootPath = createPath();
  let filePath = path.join(rootPath, req.query.name);
  res.sendFile(filePath);
});

//dodawanie folderu
app.get("/newFolder", function (req, res) {
  let rootPath = createPath();
  let directoryName = req.query.folder;
  directoryName = path.join(rootPath, directoryName);
  let directory = { name: directoryName, counter: 0 };

  newFolder(directory);
  res.redirect("/filemanager");
});

//dodawanie pliku
app.get("/newFile", function (req, res) {
  let rootPath = createPath();
  let fileName = req.query.file;
  fileName = path.join(rootPath, fileName);
  let file = { name: fileName, counter: 0 };

  newFile(file);
  res.redirect("/filemanager");
});

//upload
app.post("/upload", function (req, res) {
  let rootPath = createPath();
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

//zmiana nazwy folderu
app.get("/changeName", function (req, res) {
  let oldPath = createPath();

  let newName = req.query.name;
  rootElements[rootElements.length - 1] = newName;
  root[root.length - 1] = newName;

  let newPath = createPath();

  if (!fs.existsSync(newName)) {
    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
    });
  } else {
    res.redirect("/filemanager");
  }

  res.redirect("/filemanager");
});

//usuwanie folderow
app.get("/deleteFolder", function (req, res) {
  let rootPath = createPath();
  let directoryPath = path.join(rootPath, req.query.name);

  fs.rm(directoryPath, { recursive: true }, (err) => {
    if (err) throw err;
  });

  res.redirect("/filemanager");
});

//usuwanie plikow
app.get("/deleteFile", function (req, res) {
  let rootPath = createPath();
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
