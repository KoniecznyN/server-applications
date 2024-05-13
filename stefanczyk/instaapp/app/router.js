import { fileController } from "./fileController.js";
import { jsonController } from "./jsonController.js";
import { photos } from "./model.js";

const router = async (req, res) => {
  if (req.url == "/api/photos" && req.method == "GET") {
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(photos));
  }
  if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "GET") {
  }
  if (req.url == "/api/photos" && req.method == "POST") {
    const photoInfo = await fileController.upload(req);
    const jsonInfo = await jsonController.add(photoInfo);
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(jsonInfo));
  }
  if (req.url.match(/\/api\/photos\/([0-9]+)/) && req.method == "DELETE") {
  }
  if (req.url == "/api/photos" && req.method == "PATCH") {
  }
};

export default router;
