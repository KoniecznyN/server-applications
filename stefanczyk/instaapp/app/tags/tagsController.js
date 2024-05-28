import { addTag } from "../model.js";

const tagsController = {
  add: (tag) => {
    addTag(tag);
  },
  getone: (data, id) => {
    return data.find((element) => element.id == id);
  },
  getall: (data) => {
    return data;
  },
};

export { tagsController };
