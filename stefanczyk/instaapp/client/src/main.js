import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store/index.js";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Buefy);

app.mount("#app");
