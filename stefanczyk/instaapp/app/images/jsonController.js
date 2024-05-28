import { addPhoto, tags } from "../model.js";
import { deletePhoto } from "../model.js";

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
          lastModifiedDate: data.files.file.lastModifiedDate,
        },
      ],
      tags: [
        {
          name: "default",
        },
      ],
    };

    addPhoto(photo);
    return new Promise((res) => {
      res(photo);
    });
  },
  delete: (data, id) => {
    deletePhoto(id);
  },
  update: (id) => {},
  getone: (data, id) => {
    return data.find((element) => element.id.toString() == id);
  },
  getall: (data) => {
    return data;
  },
  addTagToPhoto: (data, id) => {},
  getPhotoTags: (data, id) => {
    let photo = data.find((element) => element.id == id);
    return {
      id: id,
      tags: photo.tags,
    };
  },
};

export { jsonController };
