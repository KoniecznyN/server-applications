import sharp from "sharp";

const filtersController = {
  getMetaData: async (server_image_path) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (server_image_path) {
          let meta = await sharp(server_image_path).metadata();
          resolve(meta);
        } else {
          resolve("url_not_found");
        }
      } catch (err) {
        reject(err.message);
      }
    });
  },
};

export { filtersController };
