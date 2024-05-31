<template>
  <b-navbar>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item href="#">
        <RouterLink to="/">Home</RouterLink>
      </b-navbar-item>
      <b-navbar-item href="#">
        <RouterLink to="/about">About</RouterLink>
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item v-show="loggedUser">
        <b-icon icon="account" size="is-medium"> </b-icon>
        <p>{{ loggedUser }}</p>
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <RouterLink
            to="/register"
            class="button is-primary"
            v-show="!loggedUser"
          >
            <strong>Sign up</strong>
          </RouterLink>
          <RouterLink to="login" class="button is-light" v-show="!loggedUser">
            Log in
          </RouterLink>
          <a @click="logout" class="button is-light" v-show="loggedUser">
            Log out
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    loggedUser() {
      let user = this.$store.getters.GET_CURRENT_USER;
      if (user != null) {
        return user.email;
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT_USER");
      localStorage.removeItem("token");
    },
  },
};
</script>

<style scoped></style>
