let photos = [];

const addPhoto = (data) => {
  photos.push(data);
};

const deletePhoto = (id) => {
  photos = photos.filter((element) => element.id.toString() != id);
};

const addTagToPhoto = (tag, id) => {};

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
  console.log(tag);
  console.log(tag.name);
  console.log(tag.popularity);
  convertedTags.push({
    id: tags.length,
    name: tag.name,
    popularity: tag.popularity,
  });
  tags.push(tag.name);
};

export { photos, addPhoto, deletePhoto, tags, convertedTags, addTag };
