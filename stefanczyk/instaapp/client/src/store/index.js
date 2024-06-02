import { createStore } from "vuex";
import user from "./user";
import photos from "./photos";

const modules = {
  // kolejne moduły

  user,
  photos,
};

const store = createStore({ modules });

export default store;
