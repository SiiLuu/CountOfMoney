<template>
  <div class="anonymousPricesBox">
    <div class="mb-1" v-if="user">
      <v-btn
        v-if="!editing"
        color="#72c4ff"
        rounded
        elevation="5"
        @click="editing = true"
      >
        Edit list
      </v-btn>
      <v-btn
        v-else
        color="#72c4ff"
        rounded
        elevation="5"
        @click="editing = false"
      >
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        Back to list
      </v-btn>
    </div>
    <v-skeleton-loader :loading="loading" type="table" v-if="!editing">
      <v-data-table
        :headers="headers"
        :items="cryptos"
        :items-per-page="10"
        height="72.5vh"
        :loading="loading"
        @click:row="onClickRow"
      >
        <!-- eslint-disable-next-line-->
        <template v-slot:item.name="{ item }">
          <div class="nameCol">
            <v-img
              contain
              :lazy-src="item.photo"
              max-height="32px"
              max-width="32px"
              :src="item.photo"
            ></v-img>
            <span class="mx-2">{{ item.name }}</span>
            <span class="shortName">{{ item.cmid }}</span>
          </div>
        </template>
        <!-- eslint-disable-next-line-->
        <template v-slot:item.id="{ item, index }">
          <span>{{ index }}.</span>
        </template>
        <!-- eslint-disable-next-line-->
        <template v-slot:item.currentPrice="{ item }">
          <span>{{ item.currentPrice }} $</span>
        </template>
        <!-- eslint-disable-next-line-->
        <template v-slot:item.openingPrice="{ item }">
          <span>{{ item.openingPrice }} $</span>
        </template>
        <!-- eslint-disable-next-line-->
        <template v-slot:item.lowestPrice="{ item }">
          <span>{{ item.lowestPrice }} $</span>
        </template>
        <!-- eslint-disable-next-line-->
        <template v-slot:item.highestPrice="{ item }">
          <span>{{ item.highestPrice }} $</span>
        </template>
      </v-data-table>
    </v-skeleton-loader>
    <div v-else>
      <h1 class="mt-5">Crypto currencies</h1>
      <h3>You can choose your crypto currencies list here</h3>
      <div class="cryptosBox">
        <div
          class="cryptoCard"
          v-for="(crypto, index) in allCryptos"
          :key="index"
          @click="onClickCrypto(crypto)"
        >
          <v-badge
            :class="{ invisibleBadge: !isFav(crypto.cmid) }"
            overlap
            color="#72c4ff"
            icon="mdi-check"
          >
          </v-badge>
          <div
            class="cryptoPart"
            :class="{ cryptoSelected: isFav(crypto.cmid) }"
          >
            <v-img
              class="cryptoImg"
              contain
              :lazy-src="crypto.photo"
              height="50px"
              width="50px"
              :src="crypto.photo"
            ></v-img>
            <span class="cryptoName">{{ crypto.name }}</span>
            <span class="cryptoCMID">{{ crypto.cmid }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "AnonymousPrices",
  data() {
    return {
      loading: false,
      editing: false,
      headers: [
        {
          text: "#",
          align: "start",
          value: "id",
        },
        { text: "Name", value: "name" },
        { text: "Current Price", value: "currentPrice" },
        { text: "Opening Price", value: "openingPrice" },
        { text: "Lowest Today", value: "lowestPrice" },
        { text: "Highest Today", value: "highestPrice" },
      ],
      allCryptos: null,
      cryptos: [],
      favorited: null,
    };
  },
  computed: {
    ...mapGetters(["user", "cryptosStored"]),
  },
  mounted() {
    this.$store
      .dispatch("fetchCryptosStored")
      .then((response) => {
        this.allCryptos = response;
        if (this.user) {
          this.$store
            .dispatch("fetchAccount")
            .then((response) => {
              this.favorited = response.favorited;
              this.cryptos = this.allCryptos.filter((item) => {
                return this.favorited.includes(item.cmid);
              });
            })
            .catch((error) => {
              throw error;
            });
        } else {
          this.cryptos = this.allCryptos;
        }
      })
      .catch((error) => {
        throw error;
      });
  },
  methods: {
    isFav(crypto) {
      if (this.favorited) {
        return this.favorited.includes(crypto);
      } else {
        return false;
      }
    },
    onClickRow(item) {
      this.$router.push("/prices/" + item.cmid);
    },
    onClickCrypto(crypto) {
      if (this.isFav(crypto.cmid)) {
        axios({
          method: "DELETE",
          url: process.env.VUE_APP_API_URL + "/api/crypto/favorite",
          headers: {
            jwt: this.user.token,
          },
          data: {
            cmid: crypto.cmid,
          },
        })
          .then((response) => {
            if (response.status) {
              this.$toast("Successfully removed !", {
                color: "green",
              });
              this.favorited = this.favorited.filter(
                (fav) => fav !== crypto.cmid
              );
              this.cryptos = this.allCryptos.filter((item) => {
                return this.favorited.includes(item.cmid);
              });
            }
          })
          .catch((err) => {
            this.$toast(err.response.data.message, {
              color: "red",
            });
            throw err;
          });
      } else {
        axios({
          method: "POST",
          url: process.env.VUE_APP_API_URL + "/api/crypto/favorite",
          headers: {
            jwt: this.user.token,
          },
          data: {
            cmid: crypto.cmid,
          },
        })
          .then((response) => {
            if (response.status) {
              this.$toast("Successfully added !", {
                color: "green",
              });
              this.favorited.push(crypto.cmid);
              this.cryptos = this.allCryptos.filter((item) => {
                return this.favorited.includes(item.cmid);
              });
            }
          })
          .catch((err) => {
            this.$toast(err.response.data.message, {
              color: "red",
            });
            throw err;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.anonymousPricesBox {
  .v-data-table {
    background: transparent;
    .nameCol {
      display: flex;
      align-items: center;
      .shortName {
        font-size: 0.8rem;
        color: #cbc2c2;
        font-weight: bold;
      }
    }
  }
  .cryptosBox {
    margin-top: 2.5rem;
    height: 65vh;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-around;
    .cryptoCard {
      cursor: pointer;
      .invisibleBadge {
        opacity: 0;
      }
      .cryptoPart {
        border: 2px solid transparent;
        border-radius: 5px;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        padding-right: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .cryptoName {
          margin-top: 0.5rem;
        }
        .cryptoCMID {
          font-size: 0.8rem;
          color: #b6a6a6;
          font-weight: bold;
        }
      }
      .cryptoSelected {
        border: 2px solid #72c4ff;
        border-radius: 5px;
      }
    }
  }
}
</style>
