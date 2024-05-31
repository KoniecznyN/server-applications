import { fileController } from "./fileController.js";
import { jsonController } from "./jsonController.js";
import { photos } from "../model.js";
import { getRequestData } from "../getRequestData.js";

const imageRouter = async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // czytam dane z nagłowka
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);

    //=====pobranie wszystkich zdjec=====
    if (req.url == "/api/photos" && req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(jsonController.getAll(photos)));
    }

    //=====pobranie jednego zdjecia=====
    if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
      const array = req.url.split("/");
      const id = array[array.length - 1];
      let photo = jsonController.getOne(photos, id);

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(photo));
    }

    //=====upload zdjecia=====
    if (req.url == "/api/photos" && req.method == "POST") {
      const photoInfo = await fileController.upload(req);
      const jsonInfo = await jsonController.add(photoInfo);

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(jsonInfo));
    }

    //=====usuniecie wybranego zdjecia=====
    if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
      const array = req.url.split("/");
      const id = array[array.length - 1];
      const photo = jsonController.getOne(photos, id);
      jsonController.delete(id);
      fileController.delete(photo);

      let message = {
        message: `photo with id ${id} deleted`,
      };

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(message));
    }

    //=====upload zdjecia=====
    if (req.url == "/api/photos" && req.method == "PATCH") {
      const data = JSON.parse(await getRequestData(req));
      jsonController.update(data);

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(jsonController.getOne(photos, data.id)));
    }

    //=====dodanie jednego tagu do zdjecia=====
    if (req.url == "/api/photos/tags" && req.method == "PATCH") {
      const data = JSON.parse(await getRequestData(req));
      jsonController.addTagToPhoto(data);

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(jsonController.getOne(photos, data.id)));
    }

    //=====dodanie kilku tagów=====
    if (req.url == "/api/photos/tags/mass" && req.method == "PATCH") {
      const data = JSON.parse(await getRequestData(req));
      jsonController.addTagToPhoto(data);

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(jsonController.getOne(photos, data.id)));
    }

    //=====pobranie wszystkich tagow danego zdjecia=====
    if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && req.method == "GET") {
      const array = req.url.split("/");
      const id = array[array.length - 1];

      const photoTags = jsonController.getPhotoTags(photos, id);

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(photoTags));
    }

    //=====pobranie pliku wybarnego zdjecia=====
    if (req.url.match(/\/api\/getimage\/([0-9]+)/) && req.method == "GET") {
      const array = req.url.split("/");
      const id = array[array.length - 1];

      const photo = jsonController.getOne(photos, id);

      fileController.getOne(photo, res);
    }

    //=====pobranie pliku przefiltrowanego zdjecia=====
    if (
      req.url.match(/\/api\/getimage\/(tint|grayscale|negate)\/([0-9]+)/) &&
      req.method == "GET"
    ) {
      const array = req.url.split("/");
      const id = array[array.length - 1];
      const filter = array[array.length - 2];

      const photo = jsonController.getOne(photos, id);

      fileController.getOne(photo, res, filter);
    }
  }
};

export { imageRouter };
