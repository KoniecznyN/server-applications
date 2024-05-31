import { loginUser, getCurrentUser } from "@/api/index.js";

const user = {
  state() {
    return {
      userObject: null,
      userToken: null,
      userLoading: false,
    };
  },
  mutations: {
    SET_CURRENT_USER(state, userObject) {
      state.userObject = userObject;
    },
    SET_CURRENT_USER_TOKEN(state, userToken) {
      state.userToken = userToken;
    },
    SET_CURRENT_USER_LOADING(state, userLoading) {
      state.userLoading = userLoading;
    },
  },
  getters: {
    GET_CURRENT_USER(state) {
      return state.userObject;
    },
    GET_CURRENT_USER_TOKEN(state) {
      return state.userToken;
    },
    GET_CURRENT_USER_LOADING(state) {
      return state.userLoading;
    },
  },
  actions: {
    LOGIN_USER({ commit, getters }, { email, password }) {
      commit("SET_CURRENT_USER_LOADING", true);

      return loginUser({ email, password })
        .then((userObject) => {
          if (userObject != undefined) {
            commit("SET_CURRENT_USER", userObject.user);
            commit("SET_CURRENT_USER_TOKEN", userObject.token);
          }
        })
        .finally(() => {
          commit("SET_CURRENT_USER_LOADING", false);
        });
    },
    LOGOUT_USER({ commit }) {
      commit("SET_CURRENT_USER", null);
      commit("SET_CURRENT_USER_TOKEN", null);
    },
    FETCH_CURRENT_USER({ commit, getters }, { token }) {
      if (getters.GET_CURRENT_USER) {
        return Promise.resolve();
      } else {
        commit("SET_CURRENT_USER_LOADING", true);
        return getCurrentUser(token)
          .then((userObject) => {
            if (userObject != undefined) {
              commit("SET_CURRENT_USER", userObject.user);
              commit("SET_CURRENT_USER_TOKEN", userObject.token);
            }
          })
          .finally(() => {
            commit("SET_CURRENT_USER_LOADING", false);
          });
      }
    },
  },
};

export default user;
