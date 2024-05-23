import { addPhoto } from "./model.js";
import { deletePhoto } from "./model.js"

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
    };

    addPhoto(photo);
    return new Promise((res) => {
      res(photo);
    });
  },
  delete: (data, id) => {
    deletePhoto(id)
  },
  update: (id) => { },
  getone: (data, id) => {
    // data.forEach(element => {
    //   const elementId = element.id.toString()
    //   if (elementId == id) {
    //     console.log(element);
    //     result = element
    //     return result
    //   }
    // });

    // let x = [{ a: 1 }, { a: 2, b: 7 }, { a: 2, b: 8 }].filter(element => element.a == 2)

    return data.find(element => element.id.toString() == id)
  },
  getall: (data) => {
    return data;
  },
};

export { jsonController };
