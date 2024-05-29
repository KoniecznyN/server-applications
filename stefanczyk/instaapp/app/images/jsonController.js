import { addPhoto } from "../model.js";
import { deletePhoto } from "../model.js";
import { patchPhoto } from "../model.js";
import { addTagToPhoto } from "../model.js";

const jsonController = {
  add: async (data) => {
    const photo = {
      id: new Date().getTime(),
      album: data.fields.album,
      originalName: data.files.file.name,
      url: data.url,
      lastChange: "original",
      history: [
        {
          status: "original",
          lastModifiedDate: new Date().getTime(),
        },
      ],
      tags: [],
    };

    addPhoto(photo);
    return new Promise((res) => {
      res(photo);
    });
  },
  delete: (id) => {
    deletePhoto(id);
  },
  update: (data, id) => {
    patchPhoto(data, id);
  },
  getone: (data, id) => {
    return data.find((element) => element.id.toString() == id);
  },
  getall: (data) => {
    return data;
  },
  addtagtophoto: (data) => {
    addTagToPhoto(data);
  },
  getphototags: (data, id) => {
    let photo = data.find((element) => element.id == id);
    return {
      id: id,
      tags: photo.tags,
    };
  },
};

export { jsonController };
