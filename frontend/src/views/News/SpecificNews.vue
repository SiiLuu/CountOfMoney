<template>
  <div class="specificNewsBox" v-if="article">
    <div class="topBox">
      <h1>
        {{ article.title }}
      </h1>
      <div class="articleWritter">
        <span>{{ article.creator }}</span>
      </div>
    </div>
    <v-img
      class="articleImg mt-4 mb-4"
      contain
      :lazy-src="article.enclosure.url"
      :src="article.enclosure.url"
    ></v-img>
    <p>
      {{ article.contentSnippet }}
    </p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SpecificNews",
  data() {
    return {
      page: 1,
      article: null,
    };
  },
  mounted() {
    axios({
      method: "GET",
      url: process.env.VUE_APP_API_URL + "/api/rss/" + this.$route.params.id,
    })
      .then((response) => {
        this.article = response.data.data;
      })
      .catch((err) => {
        throw err;
      });
  },
};
</script>

<style lang="scss" scoped>
.specificNewsBox {
  h1 {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 35px;
    line-height: 50px;
    max-width: 50%;
  }
  p {
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 30px;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .topBox {
    display: flex;
    .articleWritter {
      margin: auto;
      margin-top: 0;
      margin-right: 0;
      display: flex;
      align-items: center;
      span {
        margin-left: 0.5rem;
        font-size: 1rem;
        color: #72c4ff;
      }
    }
  }
  .midleBox {
    display: flex;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    p {
      margin-right: 1.25rem;
    }
    .articleImg {
      max-width: 50%;
      margin-left: 1.25rem;
    }
  }
}
</style>
