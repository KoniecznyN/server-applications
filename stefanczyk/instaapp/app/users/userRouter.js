import { getRequestData } from "../getRequestData.js";

const userRouter = async (req, res) => {
  if (req.url == "/api/user/register" && req.method == "POST") {
    const data = JSON.parse(await getRequestData(req));
    console.log(data);

    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(data));
  }
  if (
    req.url.match(
      /\/api\/user\/confirm\/(eyJ[A-Za-z0-9-_]+.eyJ[A-Za-z0-9-_]+.[A-Za-z0-9-_.+]*)/
    ) &&
    req.method == "GET"
  ) {
  }
  if (req.url == "/api/user/login" && req.method == "POST") {
  }
  if (req.url == "/api/user" && req.method == "GET") {
  }
};

export { userRouter };
