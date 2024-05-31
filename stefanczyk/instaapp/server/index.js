import { createServer } from "http";
import { imageRouter } from "./app/images/imageRouter.js";
import { tagsRouter } from "./app/tags/tagsRouter.js";
import { filtersRouter } from "./app/filters/filterRouter.js";
import { userRouter } from "./app/users/userRouter.js";
import "dotenv/config";

createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (
    req.url.search("/api/photos") != -1 ||
    req.url.search("/api/getimage") != -1
  ) {
    await imageRouter(req, res);
  } else if (req.url.search("/api/tags") != -1) {
    await tagsRouter(req, res);
  } else if (req.url.search("/api/filters") != -1) {
    await filtersRouter(req, res);
  } else if (req.url.search("/api/user") != -1) {
    await userRouter(req, res);
  }
}).listen(process.env.APP_PORT, () =>
  console.log(`listen on ${process.env.APP_PORT}`)
);
