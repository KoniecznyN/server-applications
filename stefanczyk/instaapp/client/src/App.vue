<template>
  <div>
    <Header></Header>
    <RouterView></RouterView>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: { Header },
  beforeCreate() {
    let token = localStorage.getItem("token");
    this.$store.dispatch("FETCH_CURRENT_USER", { token: token });
  },
};
</script>

<style scoped></style>
