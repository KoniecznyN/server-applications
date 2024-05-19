let photos = [];

const addPhoto = (data) => {
  photos.push(data);
};

const deletePhoto = (id) => {
  photos = photos.filter(element => element.id.toString() != id)
}

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
  "#food"
]

export { photos, tags, addPhoto, deletePhoto };
