<template>
  <div class="main">
    <form @submit.prevent="onSubmit">
      <section>
        <b-field label="Email" label-position="on-border">
          <b-input v-model="email" maxlength="30" type="email"></b-input>
        </b-field>

        <b-field label="Password" label-position="on-border">
          <b-input v-model="password" maxlength="30" type="password"></b-input>
        </b-field>

        <b-field>
          <p class="control">
            <b-button label="Submit" native-type="submit" type="is-primary" />
          </p>
        </b-field>

        <b-loading
          :is-full-page="false"
          v-model="this.loading"
          :can-cancel="false"
        ></b-loading>
      </section>
    </form>
    <b-message
      v-if="error"
      title="ERROR"
      type="is-danger"
      has-icon
      aria-close-label="Close message"
      class="message"
    >
      {{ error }}
    </b-message>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      logged: "",
      loading: false,
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      this.loading = true;
      this.$store
        .dispatch("LOGIN_USER", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          const user = this.$store.getters.GET_CURRENT_USER;
          const token = this.$store.getters.GET_CURRENT_USER_TOKEN;
          localStorage.setItem("token", token);
          if (user.email) {
            this.logged = true;
          } else {
            this.logged = false;
            this.error = "Nieprawidłowe email lub hasło";
            this.loading = false;
          }
        })
        .catch(() => {
          this.logged = false;
          this.error = "Nieprawidłowe email lub hasło";
          this.loading = false;
        })
        .finally(() => {
          if (this.logged) {
            this.$router.push("/");
            this.loading = false;
          }
        });
    },
  },
};
</script>

<style scoped>
.main {
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: start;
}

form {
  width: 400px;
  height: 50%;
  margin: 10px;
}
.message {
  margin: 10px;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
