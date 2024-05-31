import axios from "axios";

const post = async (url, object) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.post(url, object);
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const get = async (url) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(url);
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const registerUser = (object) =>
  post("http://localhost:3000/api/user/register", object);

const loginUser = (object) =>
  post("http://localhost:3000/api/user/login", object);

const getCurrentUser = (object) =>
  post("http://localhost:3000/api/user/currentuser", object);

export { registerUser, loginUser, getCurrentUser };
