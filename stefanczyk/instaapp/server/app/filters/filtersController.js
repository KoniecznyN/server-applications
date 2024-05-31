import sharp from "sharp";
import path, { resolve } from "path";

const __dirname = path.resolve();

const filtersController = {
  getMetaData: async (server_image_path) => {
    server_image_path = __dirname + server_image_path;
    return new Promise(async (resolve, reject) => {
      try {
        if (server_image_path) {
          let meta = await sharp(server_image_path).metadata();
          resolve(meta);
        } else {
          resolve("url_not_found");
        }
      } catch (err) {
        reject(err);
      }
    });
  },
  useFilter: async (photo, filter, options) => {
    return new Promise(async (resolve, reject) => {
      try {
        let filteredPhoto;
        const oldPath = __dirname + photo.url;
        const photoUrl = photo.url.split(".");
        const newPath = `${__dirname}${photoUrl[0]}-${filter}.${photoUrl[1]}`;
        switch (filter) {
          case "grayscale":
            filteredPhoto = await sharp(oldPath).grayscale().toFile(newPath);
            resolve(filteredPhoto);
            break;
          case "negate":
            filteredPhoto = await sharp(oldPath).negate().toFile(newPath);
            resolve(filteredPhoto);
            break;
          case "tint":
            filteredPhoto = await sharp(oldPath).tint(options).toFile(newPath);
            resolve(filteredPhoto);
            break;
        }
      } catch (err) {
        reject(err);
      }
    });
  },
};

export { filtersController };
