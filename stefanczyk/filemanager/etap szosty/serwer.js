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
app.use(express.json());

//nocache
const nocache = require("nocache");
app.use(nocache());

//cookies
const cookieparser = require("cookie-parser");
app.use(cookieparser());

let users = [];

let rootElements = [__dirname, "files"];

function readDir() {
  const rootPath = createPath(rootElements);
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
  let rootPath = createPath(rootElements);
  let filePath;
  if (file.counter == 0) {
    filePath = path.join(rootPath, `${file.name}.${file.extension}`);
  } else {
    filePath = path.join(
      rootPath,
      `${file.name}(${file.counter}).${file.extension}`
    );
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
    fileName = file.name + "." + file.extension;
  } else {
    fileName = `${file.name}(${file.counter}).${file.extension}`;
  }

  if (!fs.existsSync(fileName)) {
    let fileContent;
    if (file.extension == "css") {
      fileContent = `
body {
  background: red
}`;
    }
    if (file.extension == "html") {
      fileContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>html file</h1>
  </body>
</html>`;
    }
    if (file.extension == "js") {
      fileContent = `
<script>
  console.log("js")
</script>`;
    }
    if (file.extension == "json") {
      fileContent = `
{
  "a": 1,
  "b": 2,
  "c": 3
}`;
    }
    if (file.extension == "txt") {
      fileContent = `
txt file
a
b
c
d `;
    }
    if (file.extension == "xml") {
      fileContent = `
<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Nataniel</to>
  <from>eee</from>
  <body>mail body</body>
</note>`;
    }
    fs.writeFile(fileName, fileContent, (err) => {
      if (err) throw err;
    });
    return;
  } else {
    file.counter++;
    newFile(file);
  }
}

function createPath(arr) {
  let string = "";
  for (let i = 0; i < arr.length; i++) {
    string += arr[i];
    if (i != arr.length - 1) {
      string += "\\";
    }
  }
  return string;
}

let root = [];

function isLogged(cookie) {
  let isLogged = false;
  users.forEach((element) => {
    if (element.username == cookie) {
      isLogged = true;
    }
  });
  return isLogged;
}

app.get("/login", function (req, res) {
  console.log(users);
  res.render("login.hbs");
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const pass = req.body.pass;

  let canLogin = false;
  users.forEach((element) => {
    if (element.username == username && element.pass == pass) {
      canLogin = true;
    }
  });

  console.log(canLogin);

  if (canLogin) {
    res.cookie("login", username, { httpOnly: true, maxAge: 60 * 1000 * 60 }); // testowe 30 sekund
    res.redirect("/filemanager");
  } else {
    res.render("error.hbs", { error: "zle dane logowania" });
  }
});

app.get("/register", function (req, res) {
  res.render("register.hbs");
});

app.post("/register", function (req, res) {
  const username = req.body.username;
  const pass = req.body.pass;
  const passConfirm = req.body.passConfirm;
  let doesExist = false;
  users.forEach((element) => {
    if (element.username == username) {
      doesExist = true;
    }
  });

  if (pass != passConfirm) {
    res.render("error.hbs", { error: "bledne dane" });
  } else if (doesExist) {
    res.render("error.hbs", { error: "uzytkownik juz istnieje" });
  } else {
    users.push({ username: username, pass: pass });
    res.redirect("/login");
  }
});

app.get("/logout", function (req, res) {
  res.clearCookie("login");
  res.redirect("/login");
});

app.get("/", function (req, res) {
  res.redirect("/login");
});

app.get("/filemanager", function (req, res) {
  if (isLogged(req.cookies.login)) {
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

    let rootPath = createPath(rootElements);
    let context = readDir();
    context.root = root;

    if (root.length > 0) {
      context.changeName = "witam";
    } else context.changeName = "";

    res.render("filemanager.hbs", context);
  } else {
    res.render("error.hbs", { error: "nie jestes zalogowany" });
  }
});

//show
app.get("/show", function (req, res) {
  if (isLogged(req.cookies.login)) {
    let fileName = req.query.name;
    fileName = fileName.split(".");

    let rootPath = createPath(rootElements);
    let filePath = path.join(rootPath, req.query.name);

    if (fileName[1] == "jpg" || fileName[1] == "png") {
      fileArray = filePath.split("\\");
      fileArray = fileArray.splice(
        fileArray.indexOf("files") + 1,
        fileArray.length
      );
      imagePath = createPath(fileArray);
      imagePath = encodeURIComponent(imagePath);

      const context = {
        name: req.query.name,
        imagePath: imagePath,
        effects: [
          { name: "grayscale", imagePath: imagePath },
          { name: "invert", imagePath: imagePath },
          { name: "sepia", imagePath: imagePath },
          { name: "none", imagePath: imagePath },
        ],
      };
      console.log(imagePath);
      res.render("image.hbs", context);
    } else {
      fs.readFile(filePath, function (err, data) {
        let context = { name: req.query.name, content: data };
        res.render("edit.hbs", context);
      });
    }
  } else {
    res.render("error.hbs", { error: "nie jestes zalogowany" });
  }
});

//dodawanie folderu
app.get("/newFolder", function (req, res) {
  let rootPath = createPath(rootElements);
  let directoryName = req.query.folder;
  directoryName = path.join(rootPath, directoryName);
  let directory = { name: directoryName, counter: 0 };

  newFolder(directory);
  res.redirect("/filemanager");
});

//dodawanie pliku
app.get("/newFile", function (req, res) {
  let rootPath = createPath(rootElements);
  let fileName = req.query.file;
  fileName = path.join(rootPath, fileName);

  let fileArray = fileName.split(".");
  if (fileArray.length == 1) {
    fileArray.push("txt");
  }

  let file = { name: fileArray[0], counter: 0, extension: fileArray[1] };

  newFile(file);
  res.redirect("/filemanager");
});

//upload
app.post("/upload", function (req, res) {
  let rootPath = createPath(rootElements);
  let form = formidable({});
  form.keepExtensions = true;
  form.multiples = true;
  form.uploadDir = rootPath;
  form.parse(req, function (err, fields, files) {
    const isArray = Array.isArray(files.image);
    if (isArray) {
      files.image.forEach((element) => {
        let name = element.name.split(".");
        let file = { name: name[0], extension: name[1], counter: 0 };
        uploadFile(file, element.path);
      });
    } else {
      let name = files.image.name.split(".");
      let file = { name: name[0], extension: name[1], counter: 0 };
      uploadFile(file, files.image.path);
    }
    res.redirect("/filemanager");
  });
});

//zmiana nazwy folderu
app.get("/changeName", function (req, res) {
  let oldPath = createPath(rootElements);

  let newName = req.query.name;
  let directory = { name: newName, counter: 1 };

  rootElements[rootElements.length - 1] = newName;
  root[root.length - 1] = { name: newName };

  let newPath = createPath(rootElements);

  if (!fs.existsSync(newPath)) {
    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
    });
  } else {
    while (fs.existsSync(newPath)) {
      newName = `${directory.name}(${directory.counter})`;
      rootElements[rootElements.length - 1] = newName;
      root[root.length - 1] = { name: newName };

      newPath = createPath(rootElements);

      directory.counter++;
    }
    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
    });
  }

  res.redirect("/filemanager");
});

//zmiana nazwy pliku
app.get("/changeFileName", function (req, res) {
  rootElements[rootElements.length] = req.query.oldName;
  let oldPath = createPath(rootElements);

  let fileArray = req.query.name.split(".");
  if (fileArray.length == 1) {
    fileArray.push("txt");
  }

  let file = { name: fileArray[0], counter: 1, extension: fileArray[1] };
  let newName = file.name + "." + file.extension;

  rootElements[rootElements.length - 1] = newName;

  let newPath = createPath(rootElements);

  if (!fs.existsSync(newPath)) {
    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
    });
  } else {
    while (fs.existsSync(newPath)) {
      newName = `${file.name}(${file.counter}).${file.extension}`;
      rootElements[rootElements.length - 1] = newName;

      newPath = createPath(rootElements);

      file.counter++;
    }
    fs.rename(oldPath, newPath, (err) => {
      if (err) throw err;
    });
  }
  rootElements.pop();
  fs.readFile(newPath, function (err, data) {
    res.redirect(`/show?name=${newName}`);
  });
});

//usuwanie folderow
app.get("/deleteFolder", function (req, res) {
  let rootPath = createPath(rootElements);
  let directoryPath = path.join(rootPath, req.query.name);

  fs.rmSync(directoryPath, { recursive: true, force: true });

  res.redirect("/filemanager");
});

//usuwanie plikow
app.get("/deleteFile", function (req, res) {
  let rootPath = createPath(rootElements);
  let filePath = path.join(rootPath, req.query.name);

  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });

  res.redirect("/filemanager");
});

//zapis pliku
app.get("/save", function (req, res) {
  rootElements[rootElements.length] = req.query.name;
  let filePath = createPath(rootElements);
  let fileContent = req.query.content;
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) throw err;
    rootElements.pop();
  });
  fs.readFile(filePath, function (err, data) {
    res.redirect(`/show?name=${req.query.name}`);
  });
});

//zapis configu
app.post("/saveConfig", function (req, res) {
  let filePath = path.join(__dirname, "editorConfig.json");
  const data = JSON.stringify(req.body);
  fs.writeFile(filePath, data, (err) => {
    if (err) throw err;
  });
});

//odczyt configu
app.post("/readConfig", function (req, res) {
  let filePath = path.join(__dirname, "editorConfig.json");
  fs.readFile(filePath, function (err, data) {
    res.send(data);
  });
});

//zapis obrazka
app.post("/saveImage", function (req, res) {
  if (isLogged(req.cookies.login)) {
    let string = req.body.path;
    console.log(string);
    let filePath = createPath(rootElements);
    filePath = path.join(filePath, string);

    let dataUrl = req.body.dataUrl.split(",");
    dataUrl = dataUrl[1];

    const buffer = Buffer.from(dataUrl, "base64");
    console.log(filePath);
    fs.writeFileSync(filePath, buffer);
  }
});

//style
app.use(express.static("static"));
app.use(express.static("files"));
app.listen(PORT, function () {
  console.log("start");
});
