import axios from "axios";

const tokenGet = async (url) => {
  let token = localStorage.getItem("token");
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const tokenPost = async (url, object) => {
  let token = localStorage.getItem("token");
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.post(url, object, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

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

const file = async (url, fd) => {
  let token = localStorage.getItem("token");
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.post(url, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
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

const getAllPhotos = () => get("http://localhost:3000/api/photos");

const getUserPhotos = () => tokenGet("http://localhost:3000/api/photos");

const postPhoto = async (fd) =>
  await file("http://localhost:3000/api/photos", fd);

const updateProfilePicture = async (fd) =>
  await file("http://localhost:3000/api/user/updatepfp", fd);

const updateUserInfo = async (object) =>
  await tokenPost("http://localhost:3000/api/user/update", object);

export {
  registerUser,
  loginUser,
  getCurrentUser,
  getAllPhotos,
  getUserPhotos,
  postPhoto,
  updateProfilePicture,
  updateUserInfo,
};
