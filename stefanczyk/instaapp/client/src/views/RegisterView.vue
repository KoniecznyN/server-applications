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

        <b-field>
          <p class="control">
            <b-button label="Submit" native-type="submit" type="is-primary" />
          </p>
        </b-field>
      </section>
    </form>
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
    };
  },
  methods: {
    onSubmit() {
      console.log(this.name);
      registerUser({
        name: this.name,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
      })
        .then((data) => console.log(data.message))
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          this.$router.push("/login");
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
