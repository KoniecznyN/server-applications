import path from "path";
import formidable from "formidable";
import fs from "fs";

const __dirname = path.resolve();

const fileController = {
  upload: async (req) => {
    console.log(formidable({}));
    let oldPath = "";
    let newPath;

    const options = {
      uploadDir: __dirname + "/upload",
      multiples: true,
      keepExtensions: true,
      allowEmptyFiles: false,
    };

    // form.multiples = true;
    // form.keepExtensions = true;
    // form.uploadDir = __dirname + "/upload";
    return new Promise((res) => {
      const form = formidable(options);
      form.parse(req, function (err, fields, files) {
        console.log(files);
        oldPath = files.file.path;
        let photoName = oldPath.split("\\");
        photoName = photoName[photoName.length - 1];
        let albumPath = __dirname + "\\upload\\" + fields.album;
        newPath = albumPath + "\\" + photoName;
        if (!fs.existsSync(albumPath)) {
          fs.mkdir(albumPath, (err) => {
            if (err) throw err;
          });
        }

        fs.rename(oldPath, newPath, (err) => {
          if (err) throw err;
        });

        let url = "";
        let urlArray = newPath.split("\\");
        urlArray.splice(0, urlArray.length - 3);
        urlArray.forEach((element) => {
          url += `\\${element}`;
        });

        res({
          fields: fields,
          files: files,
          url: url,
        });
      });
    });
  },
  delete: (element) => {
    const photoPath = __dirname + element.url;
    fs.unlink(photoPath, function (err) {
      if (err) throw err;
    });
  },
};

export { fileController };
