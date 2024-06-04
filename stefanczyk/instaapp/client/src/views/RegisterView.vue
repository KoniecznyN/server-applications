<template>
  <div class="main">
    <form @submit.prevent="onSubmit">
      <section>
        <b-field label="Name" label-position="on-border">
          <b-input v-model="name" maxlength="30"></b-input>
        </b-field>

        <b-field label="Lastname" label-position="on-border">
          <b-input v-model="lastname" maxlength="30"></b-input>
        </b-field>

        <b-field label="Email" label-position="on-border">
          <b-input v-model="email" maxlength="30" type="email"></b-input>
        </b-field>

        <b-field label="Password" label-position="on-border">
          <b-input v-model="password" maxlength="30" type="password"></b-input>
        </b-field>
        <b-field label="Confirm password" label-position="on-border">
          <b-input v-model="password2" maxlength="30" type="password"></b-input>
        </b-field>

        <b-field>
          <p class="control">
            <b-button label="Submit" native-type="submit" type="is-primary" />
          </p>
        </b-field>

        <b-loading
          :is-full-page="false"
          v-model="isLoading"
          :can-cancel="false"
        ></b-loading>
      </section>
    </form>
    <b-message
      v-show="this.message"
      title="Success"
      type="is-success"
      aria-close-label="Close message"
      class="message"
    >
      {{ this.message }} <br />
      <a :href="this.url" target="_blank">{{ this.url }}</a>
    </b-message>

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
import { registerUser } from "@/api/index.js";
export default {
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      message: "",
      error: "",
      url: "",
      loading: false,
    };
  },
  computed: {
    isLoading() {
      return this.loading;
    },
  },
  methods: {
    onSubmit() {
      this.error = "";
      this.message = "";
      this.loading = true;
      if (this.password != this.password2) {
        this.loading = false;
        this.error = "Hasło nie jest takie samo";
      } else {
        registerUser({
          name: this.name,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
        })
          .then((data) => {
            this.loading = false;
            this.message = data.message;
            this.url = data.url;
          })
          .catch((err) => {
            throw err;
          })
          .finally();
      }
    },
  },
};
</script>

<style scoped>
.main {
  padding-top: 50px;
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
