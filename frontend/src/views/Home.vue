<template>
  <div class="mainApp">
    <Navbar />
    <div
      class="homeBox"
      :style="{ backgroundImage: `url('${backgroundImage}')` }"
    >
      <v-container>
        <router-view />
      </v-container>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Home",

  components: {
    Navbar,
  },

  computed: {
    backgroundImage() {
      return require("@/assets/bitcoinBackground.png");
    },
  },
};
</script>

<style lang="scss" scoped>
.mainApp {
  height: 100vh;
  width: 100vw;
  .homeBox {
    background-size: 75vh;
    background-position: right bottom;
    background-repeat: no-repeat;
    min-height: calc(100vh - 88px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media only screen and (max-width: 600px) {
    .homeBox {
      min-height: calc(100vh - 144px);
    }
  }
}
</style>
