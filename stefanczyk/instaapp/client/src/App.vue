<template>
  <Header></Header>
  <RouterView class="content"></RouterView>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  data() {
    return {};
  },
  mounted() {
    window.onpopstate = (event) => {
      if (
        localStorage.getItem("token") == null &&
        this.$route.path != "/login"
      ) {
        this.$router.push("/login"); // redirect to home, for example
      }
    };
  },
  components: { Header, Footer },
  async beforeCreate() {
    let token = localStorage.getItem("token");
    await this.$store.dispatch("FETCH_CURRENT_USER", { token: token });
    console.log(this.$store.getters.GET_CURRENT_USER);
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
