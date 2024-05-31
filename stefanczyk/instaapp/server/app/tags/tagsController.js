import { addTag } from "../model.js";

const tagsController = {
  add: (tag) => {
    addTag(tag);
  },
  getOne: (data, id) => {
    return data.find((element) => element.id == id);
  },
  getAll: (data) => {
    return data;
  },
};

export { tagsController };
