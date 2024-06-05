<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ this.photo.owner }}&nbsp;
        <span class="has-text-grey-light">
          ||&nbsp;{{ this.photo.originalName }}</span
        >
      </p>
    </header>

    <router-link :to="`/photo/${this.photo.id}`"
      ><b-image class="image" :src="url" :alt="url"></b-image
    ></router-link>
    <b-taglist class="tag-list" v-show="this.photo.tags[0]">
      <b-tag
        v-for="tag in this.photo.tags"
        type="is-primary is-light"
        size="is-medium"
        rounded
        >#{{ tag }}</b-tag
      >
    </b-taglist>

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
</template>

<script>
export default {
  name: "PhotoTile",
  props: {
    photo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    url() {
      return "http://localhost:3000/api/getimage/" + this.photo.id;
    },
  },
};
</script>

<style scoped>
.card {
  margin: 20px;
  width: 40%;
}
.tag-list {
  margin: 10px;
  padding: 0;
}

.image {
  position: relative;
  padding: 0;
  margin: 0;
  transition: 0.3s;
}
.image:hover {
  opacity: 80%;
}
</style>
