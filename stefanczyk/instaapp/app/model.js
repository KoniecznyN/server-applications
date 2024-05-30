let photos = [];

const addPhoto = (data) => {
  photos.push(data);
};

const deletePhoto = (id) => {
  photos = photos.filter((element) => element.id.toString() != id);
};

const patchPhoto = (data) => {
  let photo = photos.find((element) => element.id == data.id);
  const index = photos.findIndex((element) => {
    element.id == data.id;
  });
  photo.history.push({
    status: data.status,
    timestamp: data.timestamp,
  });
  photos[index] = photo;
};

const addTagToPhoto = (data) => {
  let photo = photos.find((element) => element.id == data.id);
  const index = photos.findIndex((element) => {
    element.id == data.id;
  });
  if (data.name == undefined) {
    data.tags.forEach((element) => {
      photo.tags.push(element);
    });
  } else {
    photo.tags.push({
      name: data.name,
    });
  }
  photos[index] = photo;
};

let tags = [
  "#love",
  "#instagood",
  "#fashion",
  "#instagram",
  "#photooftheday",
  "#art",
  "#photography",
  "#beautiful",
  "#nature",
  "#picoftheday",
  "#travel",
  "#happy",
  "#cute",
  "#instadaily",
  "#style",
  "#tbt",
  "#repost",
  "#followme",
  "#summer",
  "#reels",
  "#like4like",
  "#beauty",
  "#fitness",
  "#food",
];

const convertTags = (tags) => {
  let convertedTags = [];
  for (let i = 0; i < tags.length; i++) {
    convertedTags.push({
      id: i,
      name: tags[i],
      popularity: (Math.random() * 100).toFixed(0),
    });
  }
  return convertedTags;
};

let convertedTags = convertTags(tags);

const addTag = (tag) => {
  tag = JSON.parse(tag);
  convertedTags.push({
    id: tags.length,
    name: tag.name,
    popularity: tag.popularity,
  });
  tags.push(tag.name);
};

let users = [];

const addUser = () => {};

export {
  photos,
  addPhoto,
  deletePhoto,
  patchPhoto,
  addTagToPhoto,
  tags,
  convertedTags,
  addTag,
};
