import { createServer } from "http";
import { imageRouter } from "./app/images/imageRouter.js";
import { tagsRouter } from "./app/tags/tagsRouter.js";
import { filtersRouter } from "./app/filters/filterRouter.js";
import "dotenv/config";

createServer(async (req, res) => {
  if (req.url.search("/api/photos") != -1) {
    await imageRouter(req, res);
  } else if (req.url.search("/api/tags") != -1) {
    await tagsRouter(req, res);
  } else if (req.url.search("/api/filters") != -1) {
    await filtersRouter(req, res);
  }
}).listen(process.env.APP_PORT, () =>
  console.log(`listen on ${process.env.APP_PORT}`)
);
