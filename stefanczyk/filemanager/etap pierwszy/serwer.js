const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

const formidable = require("formidable");

//handlebars
const hbs = require("express-handlebars");
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs({ defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

//parser na obiekty danych przeslanych w formularzu
app.use(
  express.urlencoded({
    extended: true,
  })
);

let id = 1;
let context = { files: [] };
let file = {
  id: id,
  name: "",
  path: "",
  size: "",
  type: "",
  savedata: "",
  ico: "",
};

app.get("/", function (req, res) {
  res.render("upload.hbs");
});

app.post("/upload", function (req, res) {
  let form = formidable({});
  form.keepExtensions = true;
  form.multiples = true;
  form.uploadDir = path.join(__dirname, "upload");
  form.parse(req, function (err, fields, files) {
    const isArray = Array.isArray(files.image);
    console.log(isArray);
    if (isArray) {
      for (let i = 0; i < files.image.length; i++) {
        let ico = "";
        switch (files.image[i].type) {
          case "text/plain":
            ico = path.join("icons", "document.jpg");
            break;
          case "image/png":
            ico = path.join("icons", "image.jpg");
            break;
          case "image/jpeg":
            ico = path.join("icons", "image.jpg");
            break;
          default:
            ico = path.join("icons", "none.jpg");
            break;
        }
        let date = new Date();
        let time = date.getTime();
        file = {
          id: id,
          name: files.image[i].name,
          path: files.image[i].path,
          size: files.image[i].size,
          type: files.image[i].type,
          savedata: time,
          icon: ico,
        };
        context.files.push(file);
        id++;
      }
    } else {
      let ico = "";
      switch (files.image.type) {
        case "text/plain":
          ico = path.join("icons", "document.jpg");
          break;
        case "image/png":
          ico = path.join("icons", "image.jpg");
          break;
        case "image/jpeg":
          ico = path.join("icons", "image.jpg");
          break;
        default:
          ico = path.join("icons", "none.jpg");
          break;
      }
      let date = new Date();
      let time = date.getTime();
      file = {
        id: id,
        name: files.image.name,
        path: files.image.path,
        size: files.image.size,
        type: files.image.type,
        savedata: time,
        icon: ico,
      };
      context.files.push(file);
      id++;
    }
    console.log(context);
    // res.render("upload.hbs")
    res.redirect("/");
  });
});

app.get("/filemanager", function (req, res) {
  res.render("filemanager.hbs", context);
});

app.get("/show", function (req, res) {
  let result = "";
  for (let i = 0; i < context.files.length; i++) {
    if (context.files[i].id == req.query.id) {
      result = context.files[i].path;
      break;
    }
  }
  res.sendFile(result);
});

app.get("/info", function (req, res) {
  let result = "";
  for (let i = 0; i < context.files.length; i++) {
    if (context.files[i].id == req.query.id) {
      result = context.files[i];
      break;
    }
  }
  res.render("info.hbs", result);
});

app.get("/delete", function (req, res) {
  for (let i = 0; i < context.files.length; i++) {
    if (context.files[i].id == req.query.id) {
      context.files.splice(i, 1);
      break;
    }
  }
  res.redirect("/filemanager");
});

app.get("/download", function (req, res) {
  let result = "";
  for (let i = 0; i < context.files.length; i++) {
    if (context.files[i].id == req.query.id) {
      result = context.files[i].path;
      break;
    }
  }
  res.download(result);
});

app.get("/deleteAll", function (req, res) {
  context.files.splice(0, context.files.length);
  id = 1;
  res.redirect("/filemanager");
});

//style
app.use(express.static("static"));
app.listen(PORT, function () {
  console.log("start");
});
