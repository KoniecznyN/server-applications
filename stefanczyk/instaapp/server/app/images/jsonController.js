import { addPhoto } from "../model.js";
import { deletePhoto } from "../model.js";
import { patchPhoto } from "../model.js";
import { addTagToPhoto } from "../model.js";
import { addTag } from "../model.js";

const jsonController = {
  add: async (data) => {
    const photo = {
      id: new Date().getTime(),
      owner: data.user,
      originalName: data.files.file.name,
      url: data.url,
      lastChange: "original",
      history: [
        {
          status: "original",
          lastModifiedDate: new Date().getTime(),
        },
      ],
      tags: data.tags,
    };

    data.tags.forEach((tag) => {
      addTag(tag);
    });

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
  getOne: (data, id) => {
    return data.find((element) => element.id.toString() == id);
  },
  getAll: (data) => {
    return data;
  },
  addTagToPhoto: (data) => {
    addTagToPhoto(data);
  },
  getPhotoTags: (data, id) => {
    let photo = data.find((element) => element.id == id);
    return {
      id: id,
      tags: photo.tags,
    };
  },
};

export { jsonController };
