import { photos } from "../model.js";
import { jsonController } from "../images/jsonController.js";
import { filtersController } from "./filtersController.js";
import path from "path";

const __dirname = path.resolve();

const filtersRouter = async (req, res) => {
  //=====pobranie metadaty wybarnego zdjecia=====
  if (
    req.url.match(/\/api\/filters\/metadata\/([0-9]+)/) &&
    req.method == "GET"
  ) {
    const array = req.url.split("/");
    const id = array[array.length - 1];
    const photo = jsonController.getone(photos, id);
    const photoPath = __dirname + photo.url;

    console.log(photoPath);

    const metaData = await filtersController.getMetaData(photoPath);
    console.log(metaData);

    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(metaData));
  }

  //=====uzycie filtra=====
  if (req.url == "/api/filters" && req.method == "PATCH") {
  }

  //=====pobranie pliku wybarnego zdjecia=====
  if (req.url.match(/\/api\/getimage\/([0-9]+)/) && req.method == "GET") {
  }

  //=====pobranie pliku przefiltrowanego zdjecia=====
  if (
    req.url.match(/\/api\/getimage\/([0-9]+)\/filter/) &&
    req.method == "GET"
  ) {
  }
};

export { filtersRouter };
