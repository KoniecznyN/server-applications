import { users } from "../model.js";
import { userController } from "./userController.js";
import { getRequestData } from "../getRequestData.js";

const userRouter = async (req, res) => {
  if (req.url == "/api/user/register" && req.method == "POST") {
    const data = JSON.parse(await getRequestData(req));
    await userController.addUser(data);
    let user = userController.getUser(data.email);

    let token = await userController.createToken(user);

    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(
      JSON.stringify({
        message: `confirm user on: http://localhost:3000/api/user/confirm/${token}`,
      })
    );
  }
  if (
    req.url.match(
      /\/api\/user\/confirm\/(eyJ[A-Za-z0-9-_]+.eyJ[A-Za-z0-9-_]+.[A-Za-z0-9-_.+]*)/
    ) &&
    req.method == "GET"
  ) {
    const array = req.url.split("/");
    const token = array[array.length - 1];

    let decoded = await userController.verifyToken(token);
    console.log(decoded);
    if (!decoded.expired) {
      let user = userController.getUser(decoded.decoded.email);
      user.confirmed = true;
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify({ message: decoded }));
    }
  }
  if (req.url == "/api/user/login" && req.method == "POST") {
  }
  if (req.url == "/api/user" && req.method == "GET") {
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(JSON.stringify(users));
  }
};

export { userRouter };
