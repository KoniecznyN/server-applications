import {
  getAllPhotos,
  postPhoto,
  getUserPhotos,
  getOnePhoto,
} from "@/api/index.js";

const photos = {
  state() {
    return {
      photosObject: null,
      photosLoading: false,
    };
  },
  mutations: {
    SET_PHOTOS_OBJECT(state, photosObject) {
      state.photosObject = photosObject;
    },
    SET_PHOTOS_OBJECT_LOADING(state, photosLoading) {
      state.photosLoading = photosLoading;
    },
  },
  getters: {
    GET_PHOTOS_OBJECT(state) {
      return state.photosObject;
    },
    GET_PHOTOS_OBJECT_LOADING(state) {
      return state.photosLoading;
    },
  },
  actions: {
    FETCH_PHOTOS_OBJECT({ commit, getters }) {
      commit("SET_PHOTOS_OBJECT_LOADING", true);
      return getAllPhotos()
        .then((photosObject) => {
          console.log(photosObject);
          if (photosObject) {
            commit("SET_PHOTOS_OBJECT", photosObject);
          }
        })
        .finally(() => {
          commit("SET_PHOTOS_OBJECT_LOADING", false);
        });
    },
    POST_PHOTO({ commit, getters }, fd) {
      commit("SET_PHOTOS_OBJECT_LOADING", true);
      return postPhoto(fd)
        .then((photosObject) => {
          commit("SET_PHOTOS_OBJECT", photosObject);
        })
        .finally(() => {
          commit("SET_PHOTOS_OBJECT_LOADING", false);
        });
    },
    GET_USER_PHOTOS({ commit, getters }) {
      commit("SET_PHOTOS_OBJECT_LOADING", true);
      return getUserPhotos()
        .then((photosObject) => {
          if (photosObject) {
            commit("SET_PHOTOS_OBJECT", photosObject);
          }
        })
        .finally(() => {
          commit("SET_PHOTOS_OBJECT_LOADING", false);
        });
    },
    FETCH_ONE_PHOTO({ commit, getters }, id) {
      commit("SET_PHOTOS_OBJECT_LOADING", true);
      return getOnePhoto(id)
        .then((photosObject) => {
          console.log(photosObject);
          if (photosObject) {
            commit("SET_PHOTOS_OBJECT", photosObject);
          }
        })
        .finally(() => {
          commit("SET_PHOTOS_OBJECT_LOADING", false);
        });
    },
  },
};

export default photos;
