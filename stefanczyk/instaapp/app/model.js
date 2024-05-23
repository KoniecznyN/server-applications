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

const convertedTags = convertTags(tags)

function convertTags(tags) {
  let convertedTags = []
  for (let i = 0; i < tags.length; i++) {
    convertedTags.push({
      id: i,
      name: tags[i],
      popularity: (Math.random() * 100).toFixed(0)
    })
  }
  return convertedTags

}

export { photos, tags, convertedTags, addPhoto, deletePhoto };
