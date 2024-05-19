import { fileController } from "./fileController.js";
import { jsonController } from "./jsonController.js";
import { photos } from "./model.js";

const imageRouter = async (req, res) => {
  if (req.url == "/api/photos" && req.method == "GET") {
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(photos));
  }
  if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
    let array = req.url.split("/")
    const id = array[array.length - 1]
    let photo = jsonController.getone(photos, id)
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
    let array = req.url.split("/")
    const id = array[array.length - 1]
    jsonController.delete(id)
    let fdfdf = {
      message: `photo with id ${id} deleted`
    }
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(fdfdf));
  }
  if (req.url == "/api/photos" && req.method == "PATCH") {
  }
};

export default imageRouter;
