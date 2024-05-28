import { fileController } from "./fileController.js";
import { jsonController } from "./jsonController.js";
import { photos } from "../model.js";
import { getRequestData } from "../getRequestData.js";

const imageRouter = async (req, res) => {
  if (req.url == "/api/photos" && req.method == "GET") {
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(jsonController.getall(photos)));
  }
  if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
    const array = req.url.split("/");
    const id = array[array.length - 1];
    let photo = jsonController.getone(photos, id);

    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(photo));
  }
  if (req.url == "/api/photos" && req.method == "POST") {
    const photoInfo = await fileController.upload(req);
    const jsonInfo = await jsonController.add(photoInfo);

    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(jsonInfo));
  }
  if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
    const array = req.url.split("/");
    const id = array[array.length - 1];
    const photo = jsonController.getone(photos, id);
    jsonController.delete(photos, id);
    fileController.delete(photo);

    let message = {
      message: `photo with id ${id} deleted`,
    };

    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(message));
  }
  if (req.url == "/api/photos" && req.method == "PATCH") {
  }

  if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && req.method == "PATCH") {
    const data = await getRequestData(req);
    console.log(data);
  }
  if (
    req.url.match(/\/api\/photos\/tags\/mass\/([0-9]+)/) &&
    req.method == "PATCH"
  ) {
  }
  if (req.url.match(/\/api\/photos\/tags\/([0-9]+)/) && req.method == "GET") {
    const array = req.url.split("/");
    const id = array[array.length - 1];

    const photoTags = jsonController.getPhotoTags(photos, id);

    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(photoTags));
  }
};

export { imageRouter };
