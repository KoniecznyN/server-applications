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

        <section v-show="error">
          <b-message
            title="ERROR"
            type="is-danger"
            has-icon
            aria-close-label="Close message"
          >
            {{ error }}
          </b-message>
        </section>
      </section>
    </form>
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
    };
  },
  methods: {
    onSubmit() {
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
          }
        })
        .catch(() => {
          this.logged = false;
          this.error = "Nieprawidłowe email lub hasło";
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
}
form {
  width: 50%;
  height: 50%;
}
</style>
