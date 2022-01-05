import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const SET_USER = "SET_USER";
const SET_CRYPTOS_STORED = "SET_CRYPTOS_STORED";

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("cof_user")) || null,
    cryptosStored: null,
  },
  getters: {
    user: (state) => state.user,
    cryptosStored: (state) => state.cryptosStored,
  },
  mutations: {
    [SET_USER](state, value) {
      state.user = value;
    },
    [SET_CRYPTOS_STORED](state, value) {
      state.cryptosStored = value;
    },
  },
  actions: {
    fetchAccount({ state }) {
      return axios({
        method: "GET",
        url: process.env.VUE_APP_API_URL + "/api/user/profile",
        headers: {
          jwt: state.user.token,
        },
      })
        .then((response) => {
          return response.data.data[0];
        })
        .catch((err) => {
          throw err;
        });
    },
    modifAccount({ state }, value) {
      return axios({
        method: "PUT",
        url: process.env.VUE_APP_API_URL + "/api/user/profile",
        headers: {
          jwt: state.user.token,
        },
        data: value,
      })
        .then((response) => {
          return response;
        })
        .catch((err) => {
          throw err;
        });
    },
    fetchCryptosStored({ commit }) {
      return axios({
        method: "GET",
        url: process.env.VUE_APP_API_URL + "/api/crypto",
      })
        .then((response) => {
          commit("SET_CRYPTOS_STORED", response.data.data);
          return response.data.data;
        })
        .catch((err) => {
          throw err;
        });
    },
  },
});
