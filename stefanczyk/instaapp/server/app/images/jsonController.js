import { addPhoto } from "../model.js";
import { deletePhoto } from "../model.js";
import { patchPhoto } from "../model.js";
import { addTagToPhoto } from "../model.js";
import { addTag } from "../model.js";

const jsonController = {
  add: async (data) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let d = new Date();
    let day = days[d.getDay()];
    let hr = d.getHours();
    let min = d.getMinutes();
    if (min < 10) {
      min = "0" + min;
    }
    let ampm = "am";
    if (hr > 12) {
      hr -= 12;
      ampm = "pm";
    }
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    date =
      day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;

    const photo = {
      id: new Date().getTime(),
      owner: data.user,
      originalName: data.files.file.name,
      url: data.url,
      lastChange: "original",
      history: [
        {
          status: "original",
          lastModifiedDate: date,
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
