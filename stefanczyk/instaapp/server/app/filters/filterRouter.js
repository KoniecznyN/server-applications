import { photos } from "../model.js";
import { jsonController } from "../images/jsonController.js";
import { fileController } from "../images/fileController.js";
import { filtersController } from "./filtersController.js";
import { getRequestData } from "../getRequestData.js";

const filtersRouter = async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // czytam dane z nagłowka
    let token = req.headers.authorization.split(" ")[1];
    console.log(token);

    //=====pobranie metadaty wybarnego zdjecia=====
    if (
      req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) &&
      req.method == "GET"
    ) {
      const array = req.url.split("/");
      const id = array[array.length - 1];
      const photo = jsonController.getOne(photos, id);

      const metaData = await filtersController.getMetaData(photo.url);

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(metaData));
    }

    //=====uzycie filtra=====
    if (req.url == "/api/filters" && req.method == "PATCH") {
      const data = JSON.parse(await getRequestData(req));
      const photo = jsonController.getOne(photos, data.id);

      filtersController.useFilter(photo, data.filter, data.options);

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify("siema"));
    }
  }
};

export { filtersRouter };
