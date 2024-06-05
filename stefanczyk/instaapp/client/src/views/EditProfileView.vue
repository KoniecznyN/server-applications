<template>
  <div class="main">
    <form @submit.prevent="onSubmitData">
      <b-field label="Name" label-position="on-border">
        <b-input type="text" v-model="name" maxlength="30"></b-input>
      </b-field>

      <b-field label="Last name" label-position="on-border">
        <b-input type="text" v-model="lastname" maxlength="30"> </b-input>
      </b-field>

      <b-field label="Biogram" label-position="on-border">
        <b-input maxlength="200" v-model="bio" type="textarea"></b-input>
      </b-field>
      <hr />

      <b-button type="is-primary" native-type="submit" rounded>Send</b-button>

      <RouterLink to="/profile">
        <b-button type="is-primary" style="float: right" rounded
          >Cancel</b-button
        >
      </RouterLink>
    </form>
    <div style="border: 1px dashed lightgray; height: 100%"></div>
    <form @submit.prevent="onSubmitPhoto">
      <b-field label="Select profile picture" style="text-align: center">
        <b-upload v-model="file" required drag-drop>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload" size="is-large"> </b-icon>
              </p>
              <p>Drop your profile picture here or click to upload</p>
            </div>
          </section>
        </b-upload>
      </b-field>

      <div class="tags" v-if="this.file.name">
        <span class="tag is-primary">
          {{ this.file.name }}
          <button
            class="delete is-small"
            type="button"
            @click="deleteDropFile"
          ></button>
        </span>
      </div>

      <hr />

      <b-button type="is-primary" native-type="submit" rounded>Send</b-button>

      <RouterLink to="/profile">
        <b-button type="is-primary" style="float: right" rounded
          >Cancel</b-button
        >
      </RouterLink>
    </form>
  </div>
</template>

<script>
import { updateUserInfo } from "@/api";
export default {
  data() {
    return {
      file: "",
      name: "",
      lastname: "",
      bio: "",
    };
  },
  methods: {
    deleteDropFile() {
      this.file = "";
    },
    onSubmitData() {
      this.$store
        .dispatch("UPDATE_USER_INFO", {
          name: this.name,
          lastname: this.lastname,
          bio: this.bio,
        })
        .finally(() => {
          this.$router.push("/profile");
        });
    },
    onSubmitPhoto() {
      const fd = new FormData();
      fd.append("file", this.file);

      this.$store
        .dispatch("UPDATE_PROFILE_PICTURE", fd)
        .then()
        .finally(() => {
          this.$forceUpdate();
          this.$router.push("/profile");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding-top: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: start;
}

form {
  width: 400px;
  height: 50%;
}
</style>
