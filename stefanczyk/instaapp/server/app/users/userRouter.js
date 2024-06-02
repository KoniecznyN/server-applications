import { userController } from "./userController.js";
import { fileController } from "../images/fileController.js";
import { getRequestData } from "../getRequestData.js";
import cookie from "cookie";
import { decode } from "punycode";
import { log } from "console";

const userRouter = async (req, res) => {
  //rejestracja uzytkownika
  if (req.url == "/api/user/register" && req.method == "POST") {
    const data = JSON.parse(await getRequestData(req));

    await userController.addUser(data);
    let user = userController.getUser(data.email);

    let token = await userController.createToken(user);

    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end(
      JSON.stringify({
        message: `confirm user on:`,
        url: `http://localhost:3000/api/user/confirm/${token}`,
      })
    );
  }

  //confirm uzytkownika
  if (
    req.url.match(
      /\/api\/user\/confirm\/(eyJ[A-Za-z0-9-_]+.eyJ[A-Za-z0-9-_]+.[A-Za-z0-9-_.+]*)/
    ) &&
    req.method == "GET"
  ) {
    const array = req.url.split("/");
    const token = array[array.length - 1];

    let decoded = await userController.verifyToken(token);
    if (!decoded.expired) {
      let user = userController.getUser(decoded.decoded.email);
      user.confirmed = true;
      fileController.createUserFolder(user);

      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify({ message: decoded }));
    }
  }

  //login uzytkownika
  if (req.url == "/api/user/login" && req.method == "POST") {
    let data = JSON.parse(await getRequestData(req));
    let user = userController.getUser(data.email);
    console.log(user);
    if (user != undefined) {
      if (user.confirmed) {
        let isVerify = await userController.verifyUser(data, user);
        if (isVerify) {
          let token = await userController.createToken(user);

          res.end(
            JSON.stringify({
              message: "succesfully logged in",
              user: user,
              token: token,
            })
          );
        } else {
          res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
          res.end(JSON.stringify({ message: "cannot login" }));
        }
      } else {
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify({ message: "cannot login" }));
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(JSON.stringify({ message: "cannot login" }));
    }
  }

  //pobranie usera
  if (req.url == "/api/user/currentuser" && req.method == "POST") {
    let token = await getRequestData(req);
    let decoded = await userController.verifyToken(token);
    if (decoded.decoded != undefined) {
      let user = userController.getUser(decoded.decoded.email);
      res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
      res.end(
        JSON.stringify({
          user: user,
          token: token,
        })
      );
    }
  }

  //pobranie avatara usera
  if (
    req.url.match(
      /\/api\/user\/profilepicture\/(eyJ[A-Za-z0-9-_]+.eyJ[A-Za-z0-9-_]+.[A-Za-z0-9-_.+]*)/
    ) &&
    req.method == "GET"
  ) {
    const array = req.url.split("/");
    let token = array[array.length - 1];
    let decoded = await userController.verifyToken(token);

    if (decoded.decoded) {
      let user = userController.getUser(decoded.decoded.email);
      fileController.getProfilePicture(user.profilepicture, res);
    }
  }
};

export { userRouter };
