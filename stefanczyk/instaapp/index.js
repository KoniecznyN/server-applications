import { createServer } from "http";
import { imageRouter } from "./app/images/imageRouter.js";
import { tagsRouter } from "./app/tags/tagsRouter.js";
import "dotenv/config";

import sharp from "sharp";

createServer(async (req, res) => {
  if (req.url.search("/api/photos") != -1) {
    await imageRouter(req, res);
  } else if (req.url.search("/api/tags") != -1) {
    await tagsRouter(req, res);
  }
}).listen(process.env.APP_PORT, () =>
  console.log(`listen on ${process.env.APP_PORT}`)
);
