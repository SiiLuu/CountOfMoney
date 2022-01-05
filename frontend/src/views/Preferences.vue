<template>
  <div id="Preferences">
    <div>
      <v-btn
        class="mr-5"
        color="#72c4ff"
        rounded
        elevation="5"
        :outlined="tab === 'list' ? false : true"
        :dark="tab === 'list' ? true : false"
        @click="tab = 'list'"
      >
        Crypto list
      </v-btn>
      <v-btn
        color="#72c4ff"
        rounded
        elevation="5"
        :outlined="tab === 'news' ? false : true"
        :dark="tab === 'news' ? true : false"
        @click="tab = 'news'"
      >
        Crypto news
      </v-btn>
    </div>
    <div v-if="tab === 'list'">
      <div class="topBar mt-5">
        <div>
          <h1>Crypto currencies list</h1>
          <h3>Click on a crypto for remove it !</h3>
        </div>
        <div class="addCryptoBox">
          <v-text-field
            v-model="newCrypto"
            label="Enter a crypto CMID"
            outlined
            dense
            color="#72c4ff"
          ></v-text-field>
          <v-btn class="ml-2" color="#72c4ff" dark @click="addNewCrypto">
            Add
          </v-btn>
        </div>
      </div>
      <div style="height: 65vh">
        <div class="cryptosBox" v-if="cryptosArray">
          <v-dialog
            v-for="crypto in cryptosArray"
            :key="crypto.id"
            v-model="dialog"
            width="400"
          >
            <template v-slot:activator="{ on, attrs }">
              <div
                class="cryptoCard"
                v-bind="attrs"
                v-on="on"
                @click="selectedCrypto = crypto.cmid"
              >
                <div class="cryptoPart">
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
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Delete this crypto currencie ?
              </v-card-title>

              <v-card-text class="mt-5">
                You are about to remove this cryptocurrencie from the list of
                all the user's !
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="secondary" text @click="dialog = false">
                  Cancel
                </v-btn>
                <v-btn color="primary" text @click="removeCrypto">
                  Yes, delete it !
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="mt-5">Crypto currencies news</h1>
      <h3>You can see the list of sources here, check for activate it !</h3>
      <div class="newsBox">
        <div class="source" v-for="source in sources" :key="source.id">
          <v-checkbox
            v-model="source.enabled"
            @click="changeSourceStatus(source)"
            class="mr-2"
          ></v-checkbox>
          <span>{{ source.source }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Preferences",
  data() {
    return {
      newCrypto: null,
      selectedCrypto: null,
      dialog: false,
      tab: "list",
      allCryptos: null,
      sources: null,
    };
  },
  computed: {
    ...mapGetters(["user", "cryptosStored"]),
    cryptosArray() {
      if (this.allCryptos) {
        const array = this.allCryptos.map((crypto, id) => {
          return { id: id, ...crypto };
        });
        return array;
      } else {
        return null;
      }
    },
  },
  mounted() {
    // if (!this.cryptosStored) {
    //   this.$store
    //     .dispatch("fetchCryptosStored")
    //     .then((response) => {
    //       this.allCryptos = response;
    //     })
    //     .catch((error) => {
    //       throw error;
    //     });
    // } else {
    //   this.allCryptos = this.cryptosStored;
    // }
    axios({
      method: "GET",
      url: process.env.VUE_APP_API_URL + "/api/rss/sources",
      headers: {
        jwt: this.user.token,
      },
    })
      .then((response) => {
        this.sources = response.data.data;
      })
      .catch((err) => {
        throw err;
      });
  },
  methods: {
    removeCrypto() {
      this.dialog = false;
      axios({
        method: "DELETE",
        url: process.env.VUE_APP_API_URL + "/api/crypto",
        headers: {
          jwt: this.user.token,
        },
        data: {
          cmid: this.selectedCrypto,
        },
      })
        .then((response) => {
          if (response.status === 201) {
            this.$toast("Successfully removed !", {
              color: "green",
            });
            this.allCryptos = this.allCryptos.filter(
              (crypto) => crypto.cmid !== this.selectedCrypto
            );
            this.$store.commit("SET_CRYPTOS_STORED", this.allCryptos);
          }
        })
        .catch((err) => {
          this.$toast(err.response.data.message, {
            color: "red",
          });
          throw err;
        });
    },
    addNewCrypto() {
      axios({
        method: "POST",
        url: process.env.VUE_APP_API_URL + "/api/crypto",
        headers: {
          jwt: this.user.token,
        },
        data: {
          cmid: this.newCrypto,
        },
      })
        .then((response) => {
          if (response.status === 201) {
            this.$toast("Successfully added !", {
              color: "green",
            });
            this.$store
              .dispatch("fetchCryptosStored")
              .then((response) => {
                this.allCryptos = response;
              })
              .catch((error) => {
                throw error;
              });
          }
          this.newCrypto = null;
        })
        .catch((err) => {
          this.$toast(err.response.data.message, {
            color: "red",
          });
          this.newCrypto = null;
          throw err;
        });
    },
    changeSourceStatus(source) {
      console.log(source.enabled);

      axios({
        method: "PUT",
        url: process.env.VUE_APP_API_URL + "/api/rss/sources",
        headers: {
          jwt: this.user.token,
        },
        data: {
          sourceID: source.id,
          enabled: source.enabled,
        },
      })
        .then((response) => {
          this.$toast(response.data.message, {
            color: "green",
          });
        })
        .catch((err) => {
          this.$toast(err.response.data.message, {
            color: "red",
          });
          throw err;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#Preferences {
  .topBar {
    display: flex;
    .addCryptoBox {
      display: flex;
      margin-right: 0;
      margin-left: auto;
    }
  }
  .cryptosBox {
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    .cryptoCard {
      margin-right: 0.5rem;
      margin-left: 0.5rem;
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
  .newsBox {
    margin-top: 2.5rem;
    height: 65vh;
    display: flex;
    flex-direction: column;
    .source {
      display: flex;
      align-items: center;
    }
  }
}
</style>
