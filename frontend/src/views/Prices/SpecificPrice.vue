<template>
  <div class="specificPriceBox" v-if="crypto">
    <div class="topBox">
      <div class="mainInfos">
        <v-img
          contain
          :lazy-src="crypto.photo"
          max-height="40px"
          max-width="40px"
          :src="crypto.photo"
        ></v-img>
        <span class="cryptoName">{{ crypto.name }}</span>
        <span class="cryptoCMID">{{ crypto.cmid }}</span>
      </div>
      <div class="pricesInfos">
        <div class="category">
          <span class="priceText">
            Current price: <span>{{ crypto.currentPrice }} $</span>
          </span>
        </div>
        <div class="category">
          <span class="priceText">
            Opening price: <span>{{ crypto.openingPrice }} $</span>
          </span>
        </div>
        <div class="category">
          <span class="priceText">
            Lowest price: <span>{{ crypto.lowestPrice }} $</span>
          </span>
        </div>
        <div class="category">
          <span class="priceText">
            Highest price: <span>{{ crypto.highestPrice }} $</span>
          </span>
        </div>
      </div>
    </div>
    <VueTradingView
      :options="{
        symbol: `${crypto.cmid}USD`,
        theme: 'dark',
        locale: 'en',
        hide_top_toolbar: true,
      }"
    />
  </div>
</template>

<script>
import axios from "axios";
import VueTradingView from "vue-trading-view";
import { mapGetters } from "vuex";

export default {
  name: "SpecificPrice",
  components: {
    VueTradingView,
  },
  data() {
    return {
      crypto: null,
    };
  },
  computed: {
    ...mapGetters(["cryptosStored"]),
  },
  mounted() {
    if (!this.cryptosStored) {
      axios({
        method: "GET",
        url:
          process.env.VUE_APP_API_URL +
          "/api/crypto/" +
          this.$route.params.cmid,
      })
        .then((response) => {
          console.log(response.data.data);
          this.crypto = response.data.data;
        })
        .catch((err) => {
          throw err;
        });
    } else {
      this.crypto = this.cryptosStored.find(
        (crypto) => crypto.cmid === this.$route.params.cmid
      );
    }
  },
};
</script>

<style lang="scss" scoped>
.specificPriceBox {
  .topBox {
    margin-bottom: 2rem;
    .mainInfos {
      display: flex;
      align-items: center;
      justify-content: center;
      .cryptoName {
        margin-left: 1rem;
        margin-right: 1rem;
        margin-top: auto;
        margin-bottom: 0;
        font-size: 1.65rem;
      }
      .cryptoCMID {
        margin-top: auto;
        margin-right: 1rem;
        margin-bottom: 0;
        color: rgb(189, 186, 186);
        font-size: 1.65rem;
        font-weight: bold;
      }
    }
    .pricesInfos {
      margin-top: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .category {
        display: flex;
        margin-top: 0.25rem;
        margin-right: 0.5rem;
        margin-left: 0.5rem;
        margin-bottom: 0.25rem;
        .priceText {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
