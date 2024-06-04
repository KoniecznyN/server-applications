<template>
  <div>
    <b-loading
      v-if="isLoading"
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <section v-else>
      <section class="hero is-primary is-small">
        <div class="hero-body">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img
                  class="is-rounded"
                  :src="profilePicture"
                  :alt="profilePicture"
                />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ userInfo.name }} {{ userInfo.lastname }}</strong>

                  <small>&nbsp;&nbsp;{{ userInfo.email }}</small>
                  <br />
                  {{ userInfo.bio }}
                </p>
                <div class="buttons">
                  <RouterLink to="/editProfile">
                    <b-button
                      class="mdi mdi-pencil-circle"
                      label="Edit Profile"
                      rounded
                      inverted
                      outlined
                      type="is-primary"
                      size="is-small"
                    />
                  </RouterLink>
                </div>
              </div>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item">
                    <span class="icon is-small"
                      ><i class="fas fa-reply"></i
                    ></span>
                  </a>
                  <a class="level-item">
                    <span class="icon is-small"
                      ><i class="fas fa-retweet"></i
                    ></span>
                  </a>
                  <a class="level-item">
                    <span class="icon is-small"
                      ><i class="fas fa-heart"></i
                    ></span>
                  </a>
                </div>
              </nav>
            </div>
          </article>
          <section>
            <div class="buttons">
              <b-button
                class="mdi mdi-plus-thick"
                label="Add photo"
                rounded
                inverted
                outlined
                type="is-primary"
                size="is-medium"
                @click="isModalActive = true"
              />
            </div>

            <b-modal v-model="isModalActive" :width="640" scroll="keep">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">Send photo:</p>
                  <button class="card-header-icon" aria-label="more options">
                    <span class="icon">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </header>
                <form @submit.prevent="onSubmit">
                  <div class="card-content">
                    <b-field label="Select file:">
                      <b-field
                        class="file is-primary"
                        :class="{ 'has-name': !!file }"
                      >
                        <b-upload
                          v-model="file"
                          class="file-label"
                          accept=".jpg, .png"
                          required
                          rounded
                        >
                          <span class="file-cta">
                            <b-icon class="file-icon" icon="upload"></b-icon>
                            <span class="file-label">Click to upload</span>
                          </span>
                          <span class="file-name" v-if="file">
                            {{ file.name }}
                          </span>
                        </b-upload>
                      </b-field>
                    </b-field>
                    <b-field label="Add tags:">
                      <b-taginput
                        v-model="tags"
                        ellipsis
                        icon="label"
                        placeholder="Add a tag"
                        aria-close-label="Delete this tag"
                      >
                      </b-taginput>
                    </b-field>
                  </div>
                  <footer class="card-footer">
                    <a href="#" class="card-footer-item"
                      ><b-button type="is-primary" native-type="submit" rounded
                        >Send</b-button
                      ></a
                    >
                    <a href="#" class="card-footer-item"
                      ><b-button @click="cancel" type="is-primary" rounded
                        >Cancel</b-button
                      ></a
                    >
                  </footer>
                </form>
              </div>
            </b-modal>
          </section>
          <!-- <form class="upload" @submit.prevent="onSubmit()">
            <b-field class="file is-primary" :class="{ 'has-name': !!file }">
              <b-upload
                v-model="file"
                class="file-label"
                accept=".jpg, .png"
                required
                rounded
              >
                <span class="file-cta">
                  <b-icon class="file-icon" icon="upload"></b-icon>
                  <span class="file-label"
                    >{{ file.name || "Click to upload (.jpg, .png)" }}
                  </span>
                </span>
              </b-upload>
            </b-field>
            <b-button
              type="is-primary"
              native-type="submit"
              rounded
              inverted
              outlined
              >Send</b-button
            >
          </form> -->
        </div>
      </section>
      <main>
        <PhotoTile v-for="item in photosList" :photo="item"></PhotoTile>
      </main>
    </section>
  </div>
</template>

<script>
import PhotoTile from "@/components/PhotoTile.vue";
export default {
  data() {
    return {
      file: "",
      tags: [],
      isModalActive: false,
    };
  },
  components: {
    PhotoTile,
  },
  created() {
    this.$store.dispatch("GET_USER_PHOTOS");
  },
  computed: {
    userInfo() {
      return this.$store.getters.GET_CURRENT_USER;
    },
    profilePicture() {
      return (
        "http://localhost:3000/api/user/profilepicture/" +
        localStorage.getItem("token")
      );
    },
    photosList() {
      return this.$store.getters.GET_PHOTOS_OBJECT;
    },
    isLoading() {
      return this.$store.getters.GET_PHOTOS_OBJECT_LOADING;
    },
  },
  methods: {
    cancel() {
      this.isModalActive = false;
      this.tags = [];
      this.file = "";
    },
    onSubmit() {
      const fd = new FormData();
      fd.append("file", this.file);
      fd.append("tags", this.tags);
      console.log(this.file);
      console.log(this.tags);

      this.$store.dispatch("POST_PHOTO", fd);
      this.isModalActive = false;
      this.file = "";
      this.tags = [];
    },
  },
};
</script>

<style scoped>
.hero-body {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
</style>
