import { createStore } from "vuex";
import user from "./user";

const modules = {
  // kolejne moduły
  user,
};

const store = createStore({ modules });

export default store;
