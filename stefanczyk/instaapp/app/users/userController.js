import { addUser } from "../model.js";
import { users } from "../model.js";
import bcryptjs from "bcryptjs";
const { hash, compare } = bcryptjs;
import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;
import "dotenv/config";

const userController = {
  encryptPass: async (password) => {
    let encryptedPassword = await hash(password, 10);
    return encryptedPassword;
  },
  decryptPass: async (userpass, encrypted) => {
    let decrypted = await compare(userpass, encrypted);
    return decrypted;
  },
  addUser: async (data) => {
    const encryptedPassword = await userController.encryptPass(data.password);
    addUser(data, encryptedPassword);
  },
  getUser: (email) => {
    return users.find((user) => user.email == email);
  },
  createToken: async (user) => {
    let token = await sign(
      {
        email: user.email,
      },
      process.env.MY_PASS,
      {
        expiresIn: "3s", // "1m", "1d", "24h"
      }
    );
    console.log({ token: token });
    return token;
  },
  verifyToken: async (token) => {
    try {
      let decoded = verify(token, process.env.MY_PASS);
      return { expired: false, decoded: decoded };
    } catch (error) {
      return { expired: true, message: error.message };
    }
  },
};

export { userController };
