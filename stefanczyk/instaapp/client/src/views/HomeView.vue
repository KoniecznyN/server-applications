<template>
  <div>
    <h1 v-show="!canLoad" class="title is-1">Login to see photos.</h1>
    <div v-show="canLoad">
      <b-loading
        v-if="isLoading"
        :is-full-page="false"
        v-model="isLoading"
        :can-cancel="false"
      ></b-loading>
      <section v-else>
        <section class="hero is-small is-primary">
          <div class="hero-body">
            <p class="title">Home Page</p>
            <p class="subtitle">Chcieli grać ale nie ta liga [...]</p>
          </div>
        </section>

        <main>
          <PhotoTile v-for="item in photosList" :photo="item"></PhotoTile>
        </main>
      </section>
    </div>
  </div>
</template>

<script>
import PhotoTile from "@/components/PhotoTile.vue";

export default {
  data() {
    return {};
  },
  components: {
    PhotoTile,
  },
  created() {
    this.$store.dispatch("FETCH_PHOTOS_OBJECT");
  },
  computed: {
    photosList() {
      return this.$store.getters.GET_PHOTOS_OBJECT;
    },
    isLoading() {
      return this.$store.getters.GET_PHOTOS_OBJECT_LOADING;
    },
    canLoad() {
      let token = localStorage.getItem("token");
      console.log(token);
      if (token == null) {
        console.log(false);
        return false;
      } else return true;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
</style>
