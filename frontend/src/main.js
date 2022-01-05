import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuetifyToast from "vuetify-toast-snackbar";
import GAuth from "vue-google-oauth2";

Vue.config.productionTip = false;

const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: "profile email",
  prompt: "select_account",
};

Vue.use(GAuth, gauthOption);
Vue.use(VuetifyToast);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
