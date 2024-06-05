<template>
  <main>
    <b-loading
      v-if="isLoading"
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div v-else>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {{ getPhoto.owner }}&nbsp;
            <span class="has-text-grey-light">
              ||&nbsp;{{ getPhoto.originalName }}</span
            >
          </p>
        </header>
        <div class="content" style="margin: 0">
          <b-image
            class="image"
            :src="url"
            :alt="url"
            style="margin: 0"
          ></b-image>
          <div class="card-content">
            <p class="has-text-grey-light">
              Posted on:
              {{
                getPhoto.history[getPhoto.history.length - 1].lastModifiedDate
              }}
            </p>
            <a href="#">{{ getPhoto.owner }}</a>
            <p>
              Some random photo description blah blah [...] Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Phasellus nec iaculis
              mauris.
            </p>
            <a
              v-show="getPhoto.tags[0]"
              v-for="tag in getPhoto.tags"
              type="is-primary is-light"
              size="is-medium"
              rounded
              >#{{ tag }}&nbsp;</a
            >
            <br />
          </div>
        </div>

        <footer class="card-footer">
          <a href="#" class="card-footer-item"
            ><span class="mdi mdi-heart"></span>&nbsp;Like</a
          >
          <a href="#" class="card-footer-item"
            ><span class="mdi mdi-chat"></span>&nbsp;Comment</a
          >
          <a href="#" class="card-footer-item">
            <span class="mdi mdi-share"></span>&nbsp;Share</a
          >
        </footer>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("FETCH_ONE_PHOTO", this.$route.params.id);
  },
  computed: {
    getPhoto() {
      return this.$store.getters.GET_PHOTOS_OBJECT;
    },
    isLoading() {
      return this.$store.getters.GET_PHOTOS_OBJECT_LOADING;
    },
    url() {
      return "http://localhost:3000/api/getimage/" + this.getPhoto.id;
    },
  },
};
</script>

<style scoped>
.card {
  margin: 20px;
  width: 80%;
}

.content {
  display: flex;
  flex-direction: row;
}

.card-content {
  width: 30%;
}

.tag-list {
  margin: 10px;
  padding: 0;
}

.image {
  position: relative;
  padding: 0;
  margin: 0;
  width: 100%;
}

main {
  display: flex;
  justify-content: start;
  align-items: start;
  width: 100%;
}
main > div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
