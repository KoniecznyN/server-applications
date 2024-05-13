import { addPhoto } from "./model.js";

const jsonController = {
  add: async (data) => {
    console.log(data);
    const photo = {
      id: new Date().getTime(),
      album: data.fields.album,
      originalName: data.files.file.name,
      url: data.url,
      lastChange: "original",
      history: [
        {
          status: new Date().getTime(),
          lastModifiedDate: new Date().getTime(),
        },
      ],
    };

    addPhoto(photo);
    return new Promise((res) => {
      res(photo);
    });
  },
  delete: (id) => {},
  update: (id) => {},
  getall: (data) => {
    return data;
  },
};

export { jsonController };
