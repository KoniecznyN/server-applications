import { tags } from "../model.js";
import { convertedTags } from "../model.js";
import { tagsController } from "./tagsController.js";
import { getRequestData } from "../getRequestData.js";

const tagsRouter = async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // czytam dane z nagłowka
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);

    //=====wyswietlenie wszytkich tagow=====
    if (req.url == "/api/tags/raw" && req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(tagsController.getAll(tags)));
    }

    //=====wyswietlenie wszytkich tagow przekonwertowanych=====
    if (req.url == "/api/tags" && req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(tagsController.getAll(convertedTags)));
    }

    //=====pobranie jednego taga=====
    if (req.url.match(/\/api\/tags\/([0-9]+)/) && req.method == "GET") {
      const array = req.url.split("/");
      const id = array[array.length - 1];
      const tag = tagsController.getOne(convertedTags, parseInt(id));

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(tag));
    }

    //=====dodanie taga=====
    if (req.url == "/api/tags" && req.method == "POST") {
      const data = await getRequestData(req);
      tagsController.add(data);

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(tags));
    }
  }
};

export { tagsRouter };
